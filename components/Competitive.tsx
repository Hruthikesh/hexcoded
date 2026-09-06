const TOOLS = ["Magnific", "OpenArt", "ImagineArt", "LTX Studio"];

export default function Competitive() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <h2 className="font-display balance text-3xl sm:text-4xl leading-[1.12] text-[var(--ink)] max-w-[42ch]">
          Already exploring AI production tools?
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {TOOLS.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-[14px] text-[var(--ink-dim)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 max-w-[60ch] space-y-4 text-[16px] leading-relaxed text-[var(--ink-dim)]">
          <p>
            These are tools people may compare with HexCoded. They&rsquo;re
            strong tools for making images and clips, and LTX Studio also
            does storyboards.
          </p>
          <p>
            HexCoded is built around making a whole show — with consistent
            faces and looks across episodes — and can also produce the show
            as a studio.
          </p>
          <p className="text-[var(--gold-bright)]">
            We&rsquo;ll show you the difference on the demo.
          </p>
        </div>
      </div>
    </section>
  );
}
