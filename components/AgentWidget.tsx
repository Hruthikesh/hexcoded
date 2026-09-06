"use client";

import { useEffect, useRef, useState } from "react";
import { STARTER_QUESTIONS } from "@/lib/brief";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "I'm the HexCoded assistant. Ask me about the studio, the platform, or how HexCoded makes shows — or I can get you straight to a demo",
};

export default function AgentWidget({
  open,
  onOpenChange,
  onBookDemo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookDemo: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data?.error ??
            "I'm having trouble reaching the assistant right now. Please try again."
        );
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setError(
        "I couldn't reach the server. Check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-label={open ? "Close HexCoded assistant" : "Ask HexCoded"}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3.5 text-[#171308] font-medium shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-[var(--gold-bright)] transition-colors cursor-pointer"
      >
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-[#171308]"
        />
        {open ? "Close" : "Ask HexCoded"}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask HexCoded assistant"
          className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-5 z-40 flex flex-col w-full sm:w-[380px] h-full sm:h-[560px] sm:max-h-[75vh] bg-[var(--bg-raised)] border border-[var(--line-strong)] sm:rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
            <div>
              <p className="text-[13px] text-[var(--ink-faint)]">
                Ask HexCoded
              </p>
              <p className="font-display text-lg text-[var(--ink)]">
                Questions about HexCoded
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              aria-label="Close"
              className="h-9 w-9 flex items-center justify-center rounded-sm border border-[var(--line-strong)] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-colors cursor-pointer shrink-0"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-[14.5px] leading-relaxed ${
                  m.role === "user"
                    ? "text-[var(--ink)] pl-4 border-l-2 border-[var(--teal)]"
                    : "text-[var(--ink-dim)]"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="text-[14.5px] text-[var(--ink-faint)]">
                Thinking…
              </div>
            )}

            {error && (
              <div className="text-[14px] text-[#e0a06a] bg-[#2a1f14] border border-[#4a3620] rounded-sm px-3 py-2">
                {error}
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[13px] rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[var(--ink-dim)] hover:border-[var(--gold)] hover:text-[var(--gold-bright)] transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[var(--line)] p-3 space-y-2.5">
            <button
              onClick={onBookDemo}
              className="w-full inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-4 py-2.5 text-[14px] font-medium text-[#171308] hover:bg-[var(--gold-bright)] transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Message"
                className="flex-1 bg-[var(--bg)] border border-[var(--line-strong)] rounded-sm px-3 py-2.5 text-[14.5px] text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--gold)]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="shrink-0 rounded-sm border border-[var(--line-strong)] px-3.5 py-2.5 text-[14px] text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold-bright)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
