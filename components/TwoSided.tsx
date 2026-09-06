export default function TwoSided() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <h2 className="font-display balance text-3xl sm:text-4xl leading-[1.12] text-[var(--ink)] max-w-[40ch] mb-14">
          Two ways to work with HexCoded
        </h2>

        <div className="grid md:grid-cols-2 border border-[var(--line)] divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
          <div className="p-8 sm:p-10">
            <span className="text-[13px] text-[var(--gold-bright)]">
              As a studio
            </span>
            <h3 className="font-display text-2xl mt-2 mb-4 text-[var(--ink)]">
              Produce with HexCoded
            </h3>
            <p className="text-[16px] leading-relaxed text-[var(--ink-dim)] max-w-[46ch]">
              HexCoded acts as an AI studio, producing content for the apps
              and studios that commission it.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <span className="text-[13px] text-[var(--teal)]">
              As a platform
            </span>
            <h3 className="font-display text-2xl mt-2 mb-4 text-[var(--ink)]">
              Build with HexCoded
            </h3>
            <p className="text-[16px] leading-relaxed text-[var(--ink-dim)] max-w-[46ch]">
              HexCoded sells the platform it makes these productions on — to
              AI filmmakers, editors, and content teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
