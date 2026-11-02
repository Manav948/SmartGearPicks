"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { CinematicText } from "@/components/ui/CinematicText";

interface HeroProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  src: string;
  width: number;
  height: number;
}
const PRODUCTS: HeroProduct[] = [
  {
    id: "watch",
    name: "Atelier Minimal 40mm Rose Gold",
    category: "TIMEPIECE",
    description: "A quiet statement in rose gold, finished with a warm leather strap.",
    src: "/hero-extracted/watch.png",
    width: 265,
    height: 401,
  },
  {
    id: "handbag",
    name: "Sienna Italian Calfskin Satchel",
    category: "LEATHER CRAFT",
    description: "Soft Italian calfskin and considered details for everyday use.",
    src: "/hero-extracted/handbag.png",
    width: 568,
    height: 561,
  },
  {
    id: "smartphone",
    name: "Ceramic Pro Titanium Edge",
    category: "PERSONAL TECH",
    description: "A vivid edge-to-edge display set inside a refined titanium frame.",
    src: "/hero-extracted/smartphone.png",
    width: 242,
    height: 494,
  },
  {
    id: "earbuds",
    name: "Acoustic Pods Pure White",
    category: "PORTABLE AUDIO",
    description: "Compact everyday listening with a clean, easy-to-carry case.",
    src: "/hero-extracted/earbuds.png",
    width: 319,
    height: 391,
  },
  {
    id: "sunglasses",
    name: "Tortoiseshell Polarized Acetate",
    category: "EYEWEAR",
    description: "Classic tortoiseshell frames with a polished, lightweight finish.",
    src: "/hero-extracted/sunglasses.png",
    width: 719,
    height: 250,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 140,
    scale: 0.94,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -140,
    scale: 0.96,
  }),
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const activeProduct = PRODUCTS[activeIndex];

  const moveTo = useCallback((step: number) => {
    setSlideDirection(step);
    setActiveIndex((current) => (current + step + PRODUCTS.length) % PRODUCTS.length);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PRODUCTS.length);
      setSlideDirection((current) => (current === 1 ? -1 : 1));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const slideTransition = reducedMotion
    ? { duration: 0 }
    : {
        x: { type: "spring" as const, stiffness: 62, damping: 19 },
        scale: { type: "spring" as const, stiffness: 62, damping: 19 },
        opacity: { duration: 0.45 },
      };

  return (
    <section
      data-hero-section
      aria-label="Featured product collection"
      className="relative isolate h-[calc(100svh-68px)] min-h-[460px] w-full overflow-hidden bg-[#F5F2EB] sm:min-h-[540px]"
    >
      <Image
        src="/hero-extracted/backdrop.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
        data-hero-parallax
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(246,244,239,0.10) 0%, rgba(246,244,239,0.06) 48%, rgba(246,244,239,0.34) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[57%] sm:h-[63%]">
        <Image
          src="/hero-extracted/podium-set.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom drop-shadow-[0_28px_28px_rgba(50,40,30,0.16)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pb-3 pt-5 sm:px-6 sm:pt-7 lg:px-8">
        <header className="shrink-0 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7C6853] sm:text-[11px]">
            A THOUGHTFUL EDIT OF EVERYDAY FINDS
          </p>
          <h1 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#22231F]">
            Better Finds.{" "}
            <span className="font-normal italic text-[#5B4C3B]">
              Less Guesswork.
            </span>
          </h1>
        </header>

        <div className="relative min-h-0 flex-1">
          <AnimatePresence
            initial={false}
            mode="wait"
            custom={slideDirection}
          >
            <motion.div
              key={activeProduct.id}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="pointer-events-none absolute z-20"
              style={{
                left: "50%",
              top: "45%",
                translateX: "-50%",
                translateY: "-50%",
                filter: "drop-shadow(0 24px 22px rgba(45, 35, 25, 0.24))",
              }}
            >
              <Image
                src={activeProduct.src}
                alt={activeProduct.name}
                width={activeProduct.width}
                height={activeProduct.height}
                priority
                sizes="(max-width: 640px) 58vw, (max-width: 1024px) 36vw, 420px"
                className="h-auto w-auto max-h-[32vh] max-w-[68vw] object-contain sm:max-h-[44vh] sm:max-w-[44vw] lg:max-h-[50vh] lg:max-w-[40vw]"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 z-30 px-3 pb-1 text-center sm:px-8">
            <AnimatePresence
              initial={false}
              mode="wait"
              custom={slideDirection}
            >
              <motion.div
                key={activeProduct.id}
                custom={slideDirection}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-2xl"
              >
                <CinematicText
                  as="p"
                  delay={0.04}
                  stagger={0.035}
                  blur={10}
                  className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9A624B] sm:text-[10px]"
                >
                  {activeProduct.category}
                </CinematicText>
                <CinematicText
                  as="h2"
                  delay={0.08}
                  stagger={0.045}
                  blur={14}
                  className="font-display text-xl font-medium leading-tight tracking-[-0.035em] text-[#22231F] text-balance sm:text-2xl md:text-3xl lg:text-4xl"
                >
                  {activeProduct.name}
                </CinematicText>
                <CinematicText
                  as="p"
                  delay={0.14}
                  stagger={0.025}
                  blur={9}
                  className="mx-auto mt-2 max-w-lg font-sans text-[11px] leading-relaxed text-[#5F5D57] sm:text-xs md:text-sm"
                >
                  {activeProduct.description}
                </CinematicText>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <footer className="relative z-40 flex shrink-0 items-center justify-between gap-2 pt-2">
          <Link
            href="#new-arrivals"
            className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#22231F] px-4 text-[11px] font-medium text-[#F6F4EF] transition-colors hover:bg-[#354538] sm:min-h-10 sm:px-5 sm:text-xs"
          >
            <span>Explore Collection</span>
            <ArrowUpRight size={14} />
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => moveTo(-1)}
              aria-label="Show previous featured product"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#7C6853]/35 bg-white/55 text-[#22231F] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-12 text-center font-mono text-[10px] text-[#5F5D57]" aria-live="off">
              {String(activeIndex + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => moveTo(1)}
              aria-label="Show next featured product"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#7C6853]/35 bg-white/55 text-[#22231F] transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#354538]"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <a
            href="#how-we-curate"
            className="hidden min-h-9 items-center gap-1.5 text-[11px] font-medium text-[#45443F] transition-colors hover:text-[#22231F] sm:inline-flex sm:text-xs"
          >
            <Compass size={14} />
            <span>How We Curate</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
