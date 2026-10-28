"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PublicMotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.12,
      anchors: { offset: -68, duration: 1.05 },
    });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;
    const refreshAfterFonts = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    requestAnimationFrame(refreshAfterFonts);
    document.fonts?.ready.then(refreshAfterFonts);

    return () => {
      cancelled = true;
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]", root.current);

      sections.forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>("[data-scroll-reveal-item]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.68,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,visibility,opacity",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          }
        );
      });

      const hero = root.current?.querySelector<HTMLElement>("[data-hero-section]");
      const backdrop = root.current?.querySelector<HTMLElement>("[data-hero-parallax]");
      if (hero && backdrop) {
        gsap.to(backdrop, {
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          },
        });
      }

    });

    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className="contents">{children}</div>;
}
