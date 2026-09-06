"use client";

import { useEffect, useState } from "react";

export default function Nav({
  onOpenAgent,
  onBookDemo,
}: {
  onOpenAgent: () => void;
  onBookDemo: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--line)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg tracking-tight text-[var(--ink)]"
        >
          <span
            aria-hidden
            className="inline-block h-5 w-5 rounded-[3px] border border-[var(--gold)]"
            style={{
              background:
                "linear-gradient(135deg, var(--gold) 0%, transparent 60%)",
            }}
          />
          HexCoded
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[15px] text-[var(--ink-dim)]">
          <a href="#work" className="hover:text-[var(--ink)] transition-colors">
            What we make
          </a>
          <a
            href="#consistency"
            className="hover:text-[var(--ink)] transition-colors"
          >
            Consistency
          </a>
          <a href="#who" className="hover:text-[var(--ink)] transition-colors">
            Who it&rsquo;s for
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAgent}
            className="hidden sm:inline-flex items-center gap-1.5 text-[15px] text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            Ask HexCoded
          </button>
          <button
            onClick={onBookDemo}
            className="inline-flex items-center rounded-sm bg-[var(--gold)] px-4 py-2 text-[15px] font-medium text-[#171308] hover:bg-[var(--gold-bright)] transition-colors cursor-pointer"
          >
            Book a Demo
          </button>
        </div>
      </div>
    </header>
  );
}
