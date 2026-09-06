"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import WhatWeDo from "@/components/WhatWeDo";
import TwoSided from "@/components/TwoSided";
import Consistency from "@/components/Consistency";
import Competitive from "@/components/Competitive";
import WhoFor from "@/components/WhoFor";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import AgentWidget from "@/components/AgentWidget";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [agentOpen, setAgentOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Nav
        onOpenAgent={() => setAgentOpen(true)}
        onBookDemo={() => setBookingOpen(true)}
      />
      <main>
        <Hero
          onOpenAgent={() => setAgentOpen(true)}
          onBookDemo={() => setBookingOpen(true)}
        />
        <Problem />
        <WhatWeDo />
        <TwoSided />
        <Consistency />
        <Competitive />
        <WhoFor />
        <HowItWorks onBookDemo={() => setBookingOpen(true)} />
        <FinalCTA onBookDemo={() => setBookingOpen(true)} />
      </main>
      <Footer />

      <AgentWidget
        open={agentOpen}
        onOpenChange={setAgentOpen}
        onBookDemo={() => setBookingOpen(true)}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
