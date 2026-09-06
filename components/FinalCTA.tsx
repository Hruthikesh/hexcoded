export default function FinalCTA({
  onBookDemo,
}: {
  onBookDemo: () => void;
}) {
  return (
    <section className="relative border-t border-[var(--line)] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(201,154,75,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-32 text-center">
        <h2 className="font-display balance text-4xl sm:text-5xl leading-[1.08] text-[var(--ink)]">
          Ready to make a show?
        </h2>
        <p className="mt-5 text-lg text-[var(--ink-dim)]">
          See what HexCoded can produce.
        </p>
        <button
          onClick={onBookDemo}
          className="mt-10 inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-8 py-4 text-base font-medium text-[#171308] hover:bg-[var(--gold-bright)] transition-colors cursor-pointer"
        >
          Book a Demo
        </button>
      </div>
    </section>
  );
}
