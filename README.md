# HexCoded — AI Filmmaking Studio

A landing page built for the HexCoded hiring task, focused on showcasing HexCoded's AI filmmaking studio and platform.

The site includes an AI assistant that answers questions about HexCoded using the provided company brief, along with a real Cal.com demo booking flow.

## What I built

- A responsive landing page for HexCoded
- AI-powered "Ask HexCoded" assistant
- Knowledge-grounded responses based only on the approved company information
- Demo booking through Cal.com
- Cinematic hero video
- Responsive desktop and mobile layouts
- Clean, minimal visual design focused on AI filmmaking

## AI Assistant

The assistant is designed to stay within the provided HexCoded brief.

It can answer questions about:
- What HexCoded does
- Its AI filmmaking studio and platform
- Character and look consistency across a series
- How HexCoded differs from tools such as LTX Studio and OpenArt
- Demo booking

It avoids making up information and does not provide pricing.

The Gemini API is called server-side, so the API key is never exposed to the browser.

## Demo Booking

The landing page includes an embedded Cal.com scheduler.

Users can:
1. Click **Book a Demo**
2. Choose an available time
3. Enter their details
4. Complete the booking directly through Cal.com

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Gemini API
- Cal.com
- React
- Vercel

## Project Structure

```text
app/
  api/agent/       
  page.tsx          

components/
  AgentWidget.tsx   # AI chat interface
  BookingModal.tsx  # Cal.com booking modal
  Hero.tsx          # Hero section and video
  ...               # Other landing page sections

lib/
  brief.ts          # HexCoded company brief and AI instructions

public/
  hexcoded-hero.mp4
  hexcoded-hero-poster.jpg
