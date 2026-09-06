"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK; // e.g. "jivesh/hexcoded-demo"

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || !CAL_LINK) return;
    (async function initCal() {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#c99a4b" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [open]);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a demo with Jivesh"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-6"
    >
      <div className="relative w-full sm:max-w-2xl h-[90vh] sm:h-[80vh] bg-[var(--bg-raised)] border border-[var(--line-strong)] rounded-t-lg sm:rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--line)]">
          <div>
            <p className="text-[13px] text-[var(--ink-faint)]">Book a demo</p>
            <p className="font-display text-lg text-[var(--ink)]">
              Time with Jivesh
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close booking dialog"
            className="h-9 w-9 flex items-center justify-center rounded-sm border border-[var(--line-strong)] text-[var(--ink-dim)] hover:text-[var(--ink)] hover:border-[var(--gold)] transition-colors cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {CAL_LINK ? (
            <Cal
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%" }}
              config={{ theme: "dark" }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-[var(--ink)]">
                The booking calendar isn&rsquo;t connected yet.
              </p>
              <p className="text-[15px] text-[var(--ink-dim)] max-w-sm">
                Set <code className="text-[var(--gold-bright)]">NEXT_PUBLIC_CAL_LINK</code> to
                your Cal.com event link (e.g.{" "}
                <code className="text-[var(--gold-bright)]">jivesh/hexcoded-demo</code>) to turn
                this on.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
