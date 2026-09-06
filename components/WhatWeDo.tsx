const FORMATS = [
  {
    name: "Short dramas",
    note: "Serialized emotional storytelling, produced with AI for the apps that commission it.",
  },
  {
    name: "Vertical series",
    note: "Built for episodic storytelling, episode after episode.",
  },
  {
    name: "Short films",
    note: "Self-contained AI-produced stories.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="work" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-[52ch] mb-14">
          <h2 className="font-display balance text-3xl sm:text-4xl leading-[1.12] text-[var(--ink)]">
            What HexCoded makes
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--ink-dim)]">
            Produced with AI, for the apps and studios that commission them.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
          {FORMATS.map((f) => (
            <div key={f.name} className="bg-[var(--bg)] p-8 sm:p-9">
              <h3 className="font-display italic text-2xl text-[var(--gold-bright)] mb-3">
                {f.name}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--ink-dim)]">
                {f.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
