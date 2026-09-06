const AUDIENCES = [
  {
    name: "Apps & studios",
    note: "For companies commissioning AI-produced entertainment.",
  },
  {
    name: "AI filmmakers",
    note: "For creators making content with AI.",
  },
  {
    name: "Editors",
    note: "For teams working with AI-generated production.",
  },
  {
    name: "Content teams",
    note: "For teams producing and managing AI content.",
  },
];

export default function WhoFor() {
  return (
    <section id="who" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <h2 className="font-display balance text-3xl sm:text-4xl leading-[1.12] text-[var(--ink)] max-w-[42ch] mb-14">
          Who it&rsquo;s for
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)]">
          {AUDIENCES.map((a) => (
            <div key={a.name} className="bg-[var(--bg)] p-7">
              <h3 className="text-lg text-[var(--ink)] mb-2">{a.name}</h3>
              <p className="text-[14px] leading-relaxed text-[var(--ink-dim)]">
                {a.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
