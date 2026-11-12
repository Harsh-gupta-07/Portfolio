"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * On large screens the section pins and its track scrolls sideways as you
 * scroll down. Everywhere else it is a normal vertical stack.
 */
export function FeaturedTrack({ children }: { children: ReactNode }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: section },
  );

  return (
    <div ref={section} className="overflow-hidden lg:flex lg:h-svh lg:flex-col lg:justify-center lg:pt-16">
      <div ref={track} className="shell grid gap-8 lg:flex lg:max-w-none lg:gap-10 lg:pr-[var(--gutter)] lg:pl-[max(var(--gutter),calc((100vw-1280px)/2+var(--gutter)))]">
        {children}
      </div>
    </div>
  );
}
