const STEPS = [
  {
    n: "01",
    title: "Tell us what you're making",
    note: "A short drama, a vertical series, a short film — or a platform you want to build on.",
  },
  {
    n: "02",
    title: "Explore the production or platform",
    note: "See how HexCoded approaches character and look consistency.",
  },
  {
    n: "03",
    title: "Book a demo",
    note: "A call with Jivesh — where the specifics, and pricing, get discussed.",
  },
];

export default function HowItWorks({
  onBookDemo,
}: {
  onBookDemo: () => void;
}) {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <h2 className="font-display balance text-3xl sm:text-4xl leading-[1.12] text-[var(--ink)] max-w-[42ch] mb-14">
          How it works
        </h2>

        <ol className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="font-display italic text-3xl text-[var(--gold-bright)]">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg text-[var(--ink)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-dim)] max-w-[32ch]">
                {s.note}
              </p>
            </li>
          ))}
        </ol>

        <button
          onClick={onBookDemo}
          className="mt-14 inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-6 py-3.5 text-[15px] font-medium text-[#171308] hover:bg-[var(--gold-bright)] transition-colors cursor-pointer"
        >
          Book a Demo
        </button>
      </div>
    </section>
  );
}
