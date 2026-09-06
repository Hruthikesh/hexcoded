import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/brief";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "The assistant isn't configured yet — ANTHROPIC_API_KEY is missing on the server.",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return badRequest("Expected a non-empty `messages` array.");
  }
  if (messages.length > MAX_MESSAGES) {
    return badRequest("Too many messages in this conversation.");
  }

  // Validate + sanitize. This is a public endpoint — never trust the client,
  // and never let user input override the system prompt above.
  const cleaned: ChatMessage[] = [];
  for (const m of messages) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return badRequest("Malformed message in `messages`.");
    }
    cleaned.push({
      role,
      content: content.slice(0, MAX_MESSAGE_LENGTH),
    });
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: cleaned,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const reply =
      textBlock && "text" in textBlock
        ? textBlock.text
        : "I couldn't put a response together just now — mind trying again?";

    return Response.json({ reply });
  } catch (err) {
    console.error("[agent] Anthropic request failed:", err);
    return Response.json(
      {
        error:
          "I'm having trouble reaching the assistant right now. Please try again in a moment, or book a demo directly.",
      },
      { status: 502 }
    );
  }
}
