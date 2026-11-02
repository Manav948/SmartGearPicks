"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CinematicText } from "@/components/ui/CinematicText";

const PRODUCTS = [
  { id: "item1", name: "Everyday Wireless Earbuds", category: "PERSONAL AUDIO", description: "A compact listening companion, ready to go wherever the day takes you.", src: "/hero-extracted/item1.png" },
  { id: "item2", name: "Over-Ear Studio Headphones", category: "IMMERSIVE SOUND", description: "Softly cushioned comfort and rich sound for your everyday listening.", src: "/hero-extracted/item2.png" },
  { id: "item3", name: "Botanical Glow Serum", category: "SKINCARE", description: "A considered daily ritual with a clean, understated finish.", src: "/hero-extracted/item3.png" },
  { id: "item4", name: "Rosé Everyday Lip Color", category: "BEAUTY", description: "A soft, wearable shade for an effortless touch of color.", src: "/hero-extracted/item4.png" },
  { id: "item5", name: "Classic Knit Polo", category: "MODERN STYLE", description: "A relaxed staple with timeless lines and a warm, versatile tone.", src: "/hero-extracted/item5.png" },
  { id: "item6", name: "Minimal Steel Watch", category: "TIMEPIECES", description: "Clean proportions and a polished finish for every day.", src: "/hero-extracted/item6.png" },
  { id: "item7", name: "Smartwatch, Silver Edition", category: "CONNECTED LIVING", description: "Useful everyday features wrapped in a sleek, easy-to-wear design.", src: "/hero-extracted/item7.png" },
  { id: "item8", name: "Soft Linen Tunic", category: "EASY LAYERS", description: "Light, flowing comfort made for slow mornings and busy days alike.", src: "/hero-extracted/item8.png" },
];

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 100, scale: 0.94 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -100, scale: 0.96 }),
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const activeProduct = PRODUCTS[activeIndex];

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % PRODUCTS.length);
      setSlideDirection((current) => (current === 1 ? -1 : 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const transition = reducedMotion
    ? { duration: 0 }
    : { x: { type: "spring" as const, stiffness: 65, damping: 20 }, scale: { type: "spring" as const, stiffness: 65, damping: 20 }, opacity: { duration: 0.4 } };

  return (
    <section
      data-hero-section
      aria-label="Featured curated finds"
      className="relative isolate h-[calc(100svh-68px)] min-h-[500px] w-full overflow-hidden bg-[radial-gradient(ellipse_at_52%_58%,#fffdf8_0%,#f4eee3_56%,#e9e0d1_100%)] sm:min-h-[580px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#d9cbb7]/45 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pb-5 pt-8 sm:px-8 sm:pt-10">
        <header className="shrink-0 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#806c52] sm:text-[11px]">
            A thoughtful edit for everyday living
          </p>
          <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#29251f] text-balance">
            Good things, <span className="font-normal italic text-[#806247]">thoughtfully picked.</span>
          </h1>
        </header>

        <div className="relative min-h-0 flex-1">
          <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
            <motion.div
              key={activeProduct.id}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="pointer-events-none absolute inset-0 z-10"
            >
              <Image
                src={activeProduct.src}
                alt={activeProduct.name}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 68vw, 760px"
                className="scale-125 object-contain px-[5%] pb-24 pt-5 sm:scale-[1.3] sm:px-[14%] sm:pb-16 sm:pt-0"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-[2%] left-0 z-20 w-[min(80%,24rem)] text-left sm:bottom-[4%] sm:w-[min(56%,28rem)]">
            <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
              <motion.div
                key={activeProduct.id}
                custom={slideDirection}
                initial={{ opacity: 0, x: -24, y: 12 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -16, y: -6 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.55 }}
              >
                <CinematicText as="p" delay={0.1} stagger={0.04} blur={8} className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9a624b] sm:text-[10px]">
                  {activeProduct.category}
                </CinematicText>
                <CinematicText as="h2" delay={0.14} stagger={0.05} blur={10} className="font-display text-2xl font-medium leading-tight tracking-[-0.035em] text-[#29251f] sm:text-3xl">
                  {activeProduct.name}
                </CinematicText>
                <CinematicText as="p" delay={0.2} stagger={0.025} blur={7} className="mt-2 max-w-[38ch] text-xs leading-relaxed text-[#615a50] sm:text-sm">
                  {activeProduct.description}
                </CinematicText>
              </motion.div>
            </AnimatePresence>
            <div className="mt-4 flex gap-1.5" aria-label={`Product ${activeIndex + 1} of ${PRODUCTS.length}`}>
              {PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  aria-label={`Show ${product.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => {
                    setSlideDirection(index >= activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-[#806247]" : "w-1.5 bg-[#806247]/35 hover:bg-[#806247]/70"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


