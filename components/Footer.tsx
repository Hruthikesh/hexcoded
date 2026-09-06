export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[var(--ink-faint)]">
        <span>© {new Date().getFullYear()} HexCoded</span>
        <span>Models make shots, HexCoded makes shows.</span>
      </div>
    </footer>
  );
}
