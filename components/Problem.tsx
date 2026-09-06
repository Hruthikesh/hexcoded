export default function Problem() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-raised)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        <h2 className="font-display balance text-3xl sm:text-4xl leading-[1.12] text-[var(--ink)]">
          Making one great shot is easy now.
          <span className="text-[var(--ink-dim)]"> Making a show is not.</span>
        </h2>
        <div className="space-y-5 text-[17px] leading-relaxed text-[var(--ink-dim)] max-w-[58ch]">
          <p>
            Plenty of tools can generate a striking AI image or a few seconds
            of impressive video. That&rsquo;s a shot.
          </p>
          <p>
            A show is different. It&rsquo;s the same character recognizable
            across forty episodes, with the same faces and looks from
            episode to episode.           
          </p>
          <p className="text-[var(--ink)]">
            HexCoded is built around making the whole show — not the single
            shot.
          </p>
        </div>
      </div>
    </section>
  );
}
