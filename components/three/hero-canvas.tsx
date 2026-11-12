"use client";

import dynamic from "next/dynamic";

// three.js is client-only and heavy; load it after the page is interactive.
const HeroGraph = dynamic(() => import("./hero-graph"), { ssr: false });

export function HeroCanvas() {
  return <HeroGraph />;
}
