"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

export default function Hero({
  onOpenAgent,
  onBookDemo,
}: {
  onOpenAgent: () => void;
  onBookDemo: () => void;
}) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(76,125,115,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 10%, rgba(201,154,75,0.10), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-8 items-center">
        <div>
          <p className="text-sm text-[var(--gold-bright)] tracking-wide mb-5">
            An AI studio for the shows apps commission
          </p>
          <h1 className="font-display font-normal balance text-[2.6rem] leading-[1.06] sm:text-[3.4rem] sm:leading-[1.05] lg:text-[3.9rem] lg:leading-[1.04] text-[var(--ink)]">
            Models make shots.
            <br />
            <span className="italic text-[var(--gold-bright)]">
              HexCoded makes shows.
            </span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-[17px] sm:text-lg leading-relaxed text-[var(--ink-dim)]">
            We produce AI-powered short dramas, vertical series, and short
            films — built to keep the same faces and the same look from
            episode one to episode forty, not just for a single shot.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-6 py-3.5 text-[15px] font-medium text-[#171308] hover:bg-[var(--gold-bright)] transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
            <button
              onClick={onOpenAgent}
              className="inline-flex items-center justify-center rounded-sm border border-[var(--line-strong)] px-6 py-3.5 text-[15px] font-medium text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold-bright)] transition-colors cursor-pointer"
            >
              Talk to the AI
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px] text-[var(--ink-faint)]">
            <span>Short dramas</span>
            <span>Vertical series</span>
            <span>Short films</span>
          </div>
        </div>

        <HeroVideo />
      </div>
    </section>
  );
}

// Decorative hero clip. Reads prefers-reduced-motion via useSyncExternalStore
// (the React-correct way to subscribe to a browser media query) rather than
// the `autoPlay` attribute, so a reduced-motion visitor never gets even a
// first frame of motion — they see the same static poster the video would
// pause on. getServerSnapshot defaults to "no motion" so SSR/hydration never
// briefly renders an autoplaying video before the real preference is known.
function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

function HeroVideo() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const allowMotion = !reducedMotion;

  return (
    <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] aspect-video overflow-hidden rounded-md border border-[var(--line-strong)] shadow-2xl shadow-black/40">
      {allowMotion ? (
        <video
          className="h-full w-full object-cover"
          src="/hexcoded-hero.mp4"
          poster="/hexcoded-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : (
        <Image
          src="/hexcoded-hero-poster.jpg"
          alt=""
          fill
          sizes="(max-width: 640px) 420px, 460px"
          className="object-cover"
          priority
        />
      )}
    </div>
  );
}
