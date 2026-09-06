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
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "The assistant isn't configured yet — GEMINI_API_KEY is missing on the server.",
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

  // Validate and sanitize user input.
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

  // Gemini uses "model" instead of "assistant".
  const geminiContents = cleaned.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiContents,
          generationConfig: {
            maxOutputTokens: 400,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[agent] Gemini request failed:", errorText);

      return Response.json(
        {
          error:
            "I'm having trouble reaching the assistant right now. Please try again in a moment, or book a demo directly.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text ?? "")
        .join("") ||
      "I couldn't put a response together just now — mind trying again?";

    return Response.json({ reply });
  } catch (err) {
    console.error("[agent] Gemini request failed:", err);

    return Response.json(
      {
        error:
          "I'm having trouble reaching the assistant right now. Please try again in a moment, or book a demo directly.",
      },
      { status: 502 }
    );
  }
}