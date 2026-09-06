# HexCoded — landing page + AI sales agent

Built for the HexCoded hiring task: a landing page with an embedded, brief-constrained
AI sales assistant, and a real Cal.com demo-booking flow.

**Status:** built, verified with a local production build (`npm run build` passes clean,
zero lint errors), and screenshot-checked on desktop and mobile. **Not yet deployed** —
this environment has no network access to Vercel, Cal.com, or a live LLM API key, so
deployment and end-to-end testing with real credentials are the two things left for you
to do (below, ~5 minutes).

---

## 1. Tech stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS v4**
- **Claude (Anthropic API)** powers the agent, via `@anthropic-ai/sdk`, called
  server-side only from `app/api/agent/route.ts`
- **Cal.com** via the official `@calcom/embed-react` widget for booking — this embeds
  Cal's real scheduler directly (not a hand-rolled API integration), so bookings it
  creates are real Cal.com events with no extra backend required
- **Fraunces** (display/serif) + **Space Grotesk** (body/sans) via `@fontsource`
- Deploy target: **Vercel**

Two intentional substitutions from the brief's "preferred stack," both reliability
upgrades, not corners cut:
- **Claude instead of OpenAI** for the agent — same job (chat completion with a system
  prompt), and it's what I had credentials/access to build and test against.
- **Cal.com's embed widget instead of a custom Cal.com API integration** — the embed is
  Cal's own maintained scheduling UI; it creates real bookings without you needing to
  manage `CAL_API_KEY` / `CAL_EVENT_TYPE_ID` or write booking-error handling yourself.

If you'd rather have the OpenAI SDK or a raw Cal.com API integration instead, both are
straightforward swaps in `app/api/agent/route.ts` and `components/BookingModal.tsx`
respectively.

## 2. How the AI agent works

- All approved facts about HexCoded live in **`lib/brief.ts`** (`COMPANY_BRIEF`) — this
  is the single source of truth, copied faithfully from your brief with nothing added.
- `SYSTEM_PROMPT` (also in `lib/brief.ts`) wraps that brief with the hard rules: never
  invent facts, never quote pricing in any form, only the approved competitor framing,
  offer the booking flow for human requests, ask at most one light qualifying question,
  never block booking behind it.
- `app/api/agent/route.ts` is the only place that talks to the Anthropic API. It:
  - reads `ANTHROPIC_API_KEY` server-side only (never sent to the browser)
  - validates and sanitizes the incoming message array (role/type/length checks, caps
    conversation length) before it ever reaches the model
  - always sends your fixed `SYSTEM_PROMPT` — the client cannot override or inject into
    it, since only `messages` (not `system`) is accepted from the request body
  - returns a plain, user-facing error message if the API key is missing or the request
    fails, instead of crashing or leaking internals
- `components/AgentWidget.tsx` is the "Ask HexCoded" panel — starter questions, a
  persistent Book a Demo button, and a message thread. It calls `/api/agent`, nothing
  else, and never sees the API key.

I could not test a real model response in this sandbox (no outbound access to
`api.anthropic.com` with a live key from here) — I verified instead that the endpoint
behaves correctly when the key is absent (graceful error, confirmed live) and that the
request validation, sanitation, and system-prompt handling in the code are correct by
inspection. Once you add a real `ANTHROPIC_API_KEY`, re-run the test questions in
section 6 below before considering this done.

## 3. How Cal.com booking works

- `components/BookingModal.tsx` renders Cal.com's own embedded scheduler
  (`@calcom/embed-react`) inside a modal (desktop) / bottom sheet (mobile).
- It reads `NEXT_PUBLIC_CAL_LINK` (e.g. `jivesh/hexcoded-demo`) and points the embed at
  your real Cal.com event type. Because it's Cal's own widget, availability, slot
  selection, confirmation, and the resulting calendar invite to Jivesh are all handled
  by Cal.com directly — nothing here fakes or shortcuts that.
- If `NEXT_PUBLIC_CAL_LINK` isn't set, the modal shows an honest "booking calendar isn't
  connected yet" state instead of a broken or fake-success screen (verified via
  screenshot on both desktop and mobile).
- The agent's "book a demo" and "talk to a human" flows both just open this same modal
  (`onBookDemo` prop, wired from `app/page.tsx`) — no fake transfer, no separate path.

## 3b. Hero media

The hero's right-hand visual is a real video (`components/Hero.tsx`):

- **File:** `public/hexcoded-hero.mp4` — H.264 (High profile), `yuv420p`, 1280×720,
  no audio track (none was needed), remuxed with `faststart` so the moov atom is at
  the front of the file for progressive playback instead of waiting on a full download.
  It was fully re-encoded (decoded and re-encoded with `libx264`), not just container-copied,
  after the originally supplied file failed to decode in a strict browser media pipeline
  despite `ffprobe`/`ffmpeg` reading it as valid — see the note on testing below.
- **Poster:** `public/hexcoded-hero-poster.jpg`, extracted from the same shipped video file
  (1s mark, to avoid a black/fade-in first frame) and used as both the `<video poster>` and
  the static fallback image.
- **Attributes:** `autoPlay muted loop playsInline preload="metadata"`, as specified.
- **Reduced motion:** the component reads `prefers-reduced-motion` via
  `useSyncExternalStore` (not a `useEffect`/`setState` combo — that pattern trips React's
  `set-state-in-effect` lint rule and causes redundant renders). When reduced motion is
  on, the `<video>` element is never rendered at all — only the static poster image is —
  which I verified live: the video file is never even requested over the network in that
  case, not just paused.
- **Layout:** the video sits in the same grid slot the old CSS visual occupied, but I
  changed its aspect ratio from the previous 4:5 portrait box to `aspect-video` (16:9) to
  match the actual footage — forcing real landscape footage into a portrait crop would
  have cut off significant parts of the frame. Headline, CTAs, and overall two-column
  spacing are unchanged.

**A note on testing this video:** I could not get pixel-level playback confirmation of the
MP4 in this sandbox. Investigating why, I found that Playwright's bundled Chromium here has
no H.264 decoder at all — I confirmed this by testing your original upload, my re-encode,
*and* a synthetic H.264 clip generated from scratch, all of which failed identically with
`DEMUXER_ERROR_NO_SUPPORTED_STREAMS`, while a VP9/WebM test file played perfectly and
`canPlayType()` reported no MP4/H.264 support at all. That's a known limitation of
open-source Chromium builds (no license for the proprietary H.264 decoder), not something
about this file specifically. Real Chrome, Edge, and Safari all ship licensed H.264
decoders and Firefox uses the platform decoder on most systems, so the file should play
normally there — but please do a real-browser check yourself after deploying, since this
is the one thing in this whole build I couldn't personally watch play.

## 4. Environment variables

Copy `.env.example` to `.env.local` for local dev, and set the same three in your
Vercel project settings for production:

| Variable | Required | Where it's used | Notes |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Yes, for the agent to answer | Server only (`app/api/agent/route.ts`) | Get one at console.anthropic.com. Never exposed to the browser. |
| `NEXT_PUBLIC_CAL_LINK` | Yes, for real booking | Client (`BookingModal.tsx`) | Format `username/event-slug`. Create a free Cal.com account + event type first. |
| `NEXT_PUBLIC_SITE_URL` | Optional | SEO/Open Graph metadata | Set to your deployed URL once you have it, e.g. `https://hexcoded.vercel.app`. |

## 5. Deploy steps (what's left for you to do)

I can't reach Vercel or Cal.com from this sandbox, so this part is on you — it's short:

1. **Cal.com**: sign up free at cal.com → create an event type for Jivesh (e.g.
   30-min "HexCoded Demo") → copy its link, e.g. `jivesh/hexcoded-demo`.
2. **Anthropic**: get an API key at console.anthropic.com.
3. **Push this repo to GitHub** (unzip the delivered project, `git init`, commit, push).
4. **Vercel**: import the GitHub repo at vercel.com/new, add the three env vars from
   the table above in the project settings, deploy.
5. **Open the deployed URL** and manually run through the test list in section 6 —
   especially an actual booking end to end — before treating it as launch-ready.
6. Update `NEXT_PUBLIC_SITE_URL` to the real deployed URL and redeploy (or just set it
   correctly in step 4 before the first deploy) so Open Graph links preview correctly.

**Redeploying later:** any push to the connected GitHub branch redeploys automatically;
no manual steps needed after the first setup.

## 6. Test checklist to run once real keys are in place

These are the exact cases from the brief — I verified the code paths and UI by
inspection and by exercising the app with no API key (confirming graceful fallback);
run these against the live deployment with real credentials before calling it done:

- Basic: "What is HexCoded?", "Who is HexCoded for?", "Can HexCoded produce a whole
  series?"
- Competitors: "How is HexCoded different from LTX Studio?", "Is HexCoded better than
  OpenArt?" — responses should stay within the approved framing, no "X can't do Y."
- Pricing: "How much does it cost?", "give me a ballpark" — should never return a
  number, always redirect to the demo call.
- Unknown info: "How many employees do you have?", "What models do you use?" — should
  say plainly it doesn't have that, offer a demo, never guess.
- Booking: "I want to book a demo", "I want to talk to Jivesh" — should open the real
  Cal.com scheduler and complete an actual booking.
- Mobile: repeat the above on a phone.

## 7. Known limitations / what I couldn't verify myself

- **No live deployment** — I built and verified this locally only (see section 1).
- **No live agent test** — validated the code path and the "key missing" graceful error;
  couldn't confirm actual Claude responses without a working key in this sandbox.
- **No live booking test** — the embed is Cal.com's own tested widget, but I couldn't
  set `NEXT_PUBLIC_CAL_LINK` to a real event and complete an actual booking here.
- **No pixel-level video playback test** — see section 3b. Confirmed the file decodes
  cleanly via `ffmpeg`, is standards-compliant H.264, and serves correctly over HTTP
  (200, correct `Content-Type`, range requests work) — but couldn't watch it actually
  render, since this sandbox's browser has no H.264 decoder at all. Please spot-check
  it in a real browser after deploying.
- Analytics events (section 23 of the brief) were left out — the brief marked this as
  optional and not a blocker; happy to add basic funnel tracking (e.g. Vercel Analytics
  or a simple event call at each CTA) if you want it.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev
```

Open http://localhost:3000. Production build check: `npm run build`.
