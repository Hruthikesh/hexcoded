const CHAIN = ["Character", "Scene", "Episode", "Series"];

export default function Consistency() {
  return (
    <section id="consistency" className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
          <div>
            <h2 className="font-display balance text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.1] text-[var(--ink)]">
              Same characters.
              <br />
              Same looks.
              <br />
              <span className="italic text-[var(--gold-bright)]">
                Across the series.
              </span>
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-[var(--ink-dim)] max-w-[48ch]">
              HexCoded&rsquo;s edge is keeping characters and looks consistent
              from one episode to the next.            
            </p>
          </div>

          <div
            className="relative flex flex-col sm:flex-row items-stretch gap-0 border border-[var(--line-strong)] bg-[var(--bg-raised)]"
            role="list"
            aria-label="From a single character to a full series"
          >
            {CHAIN.map((step, i) => (
              <div
                key={step}
                role="listitem"
                className={`relative flex-1 p-6 sm:p-7 flex flex-col justify-between ${
                  i !== 0 ? "border-t sm:border-t-0 sm:border-l" : ""
                } border-[var(--line)]`}
              >
                <span className="text-[13px] text-[var(--ink-faint)]">
                  0{i + 1}
                </span>
                <span className="font-display italic text-xl sm:text-lg text-[var(--ink)] mt-6">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
