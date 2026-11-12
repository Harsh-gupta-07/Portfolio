"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * One place for every declarative scroll animation. Server components opt in
 * with data attributes:
 *
 *   data-reveal              fade + rise when it enters the viewport
 *   data-split[="load"]      heading lines slide up from a mask (on scroll, or on load)
 *   data-scrub-words         words ink in as you scroll past
 *   data-count               number counts up (reads data-decimals / data-suffix)
 *   data-draw                vertical rule draws itself while scrolling
 *
 * Without JS, or with reduced motion, everything is simply visible.
 *
 * Render it as the LAST child of each page (not in the root layout): its
 * effect must run after that page's DOM has hydrated, otherwise SplitText
 * rewrites nodes React is still hydrating.
 */
export function MotionController() {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.07 }),
        });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const onLoad = el.dataset.split === "load";
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              // Tight display leading would clip descenders inside the masks.
              gsap.set(self.masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
              gsap.set(el, { autoAlpha: 1 });
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 1,
                ease: "expo.out",
                stagger: 0.08,
                delay: onLoad ? 0.15 : 0,
                scrollTrigger: onLoad ? undefined : { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const suffix = el.dataset.suffix ?? "";
          const format = (n: number) =>
            n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
            suffix;
          const state = { n: 0 };
          el.textContent = format(0);
          gsap.to(state, {
            n: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = format(state.n);
            },
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top",
              scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: true },
            },
          );
        });
      });

      // Fonts change line breaks; re-measure once they're in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    [],
  );

  return null;
}
