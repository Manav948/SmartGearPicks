"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";

/**
 * Editorial Scene Configuration
 * Precision coordinates tuned to physically settle onto the stone podiums
 *
 * Podium landmarks in container coordinates:
 * - Center large round podium top: center ~(50%, 65%)
 * - Left square/round stepped podium: ~(22%, 75%)
 * - Right stepped podium: ~(78%, 73%)
 * - Back-left arch backdrop: ~(20%, 38%)
 * - Foliage & accent rocks: ~(82%, 52%)
 */

interface ProductConfig {
  id: string;
  name: string;
  category: string;
  src: string;
  width: number;
  height: number;
  zIndex: number;
  // Final resting position (% of container)
  rest: {
    left: string;
    top: string;
    scale: number;
    rotate: number;
  };
  // Entrance departure vectors (delta in px, rotate, scale)
  entrance: {
    x: number;
    y: number;
    rotate: number;
    scale: number;
  };
  // Scroll progress response (0 to 1)
  scrollRange: [number, number];
  // Natural contact shadow configuration
  shadow: string;
  filter: string;
}

const PRODUCTS: ProductConfig[] = [
  // 1. Handbag - Centerpiece on the main stone podium
  {
    id: "handbag",
    name: "Sienna Italian Calfskin Satchel",
    category: "Leather Craft",
    src: "/hero-extracted/handbag.png",
    width: 568,
    height: 561,
    zIndex: 22,
    rest: {
      left: "48%",
      top: "46%",
      scale: 0.88,
      rotate: -1.5,
    },
    entrance: {
      x: 0,
      y: -140,
      rotate: 4,
      scale: 1.15,
    },
    scrollRange: [0.05, 0.45],
    shadow: "drop-shadow(0 28px 24px rgba(70, 50, 30, 0.28))",
    filter: "contrast(1.02) saturate(1.03)",
  },
  // 2. Smartphone - Sits elegantly on the left stepped stone podium
  {
    id: "smartphone",
    name: "Ceramic Pro Titanium Edge",
    category: "Personal Tech",
    src: "/hero-extracted/smartphone.png",
    width: 242,
    height: 494,
    zIndex: 25,
    rest: {
      left: "21%",
      top: "54%",
      scale: 0.78,
      rotate: 3.5,
    },
    entrance: {
      x: -180,
      y: 60,
      rotate: -12,
      scale: 0.9,
    },
    scrollRange: [0.1, 0.52],
    shadow: "drop-shadow(0 20px 20px rgba(10, 20, 40, 0.32))",
    filter: "contrast(1.04)",
  },
  // 3. Headphones - Resting dynamically near the right stepped podium
  {
    id: "headphones",
    name: "Studio Precision ANC Wireless",
    category: "High-Fidelity Audio",
    src: "/hero-extracted/headphones.png",
    width: 318,
    height: 353,
    zIndex: 26,
    rest: {
      left: "75%",
      top: "56%",
      scale: 0.84,
      rotate: 6,
    },
    entrance: {
      x: 180,
      y: -80,
      rotate: -10,
      scale: 1.1,
    },
    scrollRange: [0.12, 0.58],
    shadow: "drop-shadow(0 22px 22px rgba(20, 15, 10, 0.34))",
    filter: "contrast(1.03)",
  },
  // 4. Timepiece / Watch - On the foreground lower platform
  {
    id: "watch",
    name: "Atelier Minimal 40mm Rose Gold",
    category: "Horology",
    src: "/hero-extracted/watch.png",
    width: 265,
    height: 401,
    zIndex: 28,
    rest: {
      left: "35%",
      top: "65%",
      scale: 0.65,
      rotate: -4,
    },
    entrance: {
      x: -120,
      y: 120,
      rotate: 15,
      scale: 0.85,
    },
    scrollRange: [0.22, 0.7],
    shadow: "drop-shadow(0 16px 16px rgba(50, 30, 15, 0.28))",
    filter: "contrast(1.04)",
  },
  // 5. Earbuds - Placed delicately on the right tier next to foliage
  {
    id: "earbuds",
    name: "Acoustic Pods Pure White",
    category: "Portable Audio",
    src: "/hero-extracted/earbuds.png",
    width: 319,
    height: 391,
    zIndex: 27,
    rest: {
      left: "64%",
      top: "62%",
      scale: 0.64,
      rotate: 2,
    },
    entrance: {
      x: 140,
      y: 100,
      rotate: -8,
      scale: 0.85,
    },
    scrollRange: [0.25, 0.75],
    shadow: "drop-shadow(0 16px 18px rgba(30, 30, 30, 0.22))",
    filter: "contrast(1.02)",
  },
  // 6. Sunglasses - Settled in the foreground base
  {
    id: "sunglasses",
    name: "Tortoiseshell Polarized Acetate",
    category: "Eyewear",
    src: "/hero-extracted/sunglasses.png",
    width: 719,
    height: 250,
    zIndex: 29,
    rest: {
      left: "52%",
      top: "76%",
      scale: 0.62,
      rotate: 2.5,
    },
    entrance: {
      x: 0,
      y: 160,
      rotate: -6,
      scale: 0.95,
    },
    scrollRange: [0.35, 0.85],
    shadow: "drop-shadow(0 14px 14px rgba(40, 25, 10, 0.35))",
    filter: "contrast(1.03)",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll through the bounded sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      data-hero-section
      className="relative w-full"
      style={{
        // 200vh gives a luxurious, unhurried, comfortable scroll journey without trapping the user
        height: shouldReduceMotion ? "auto" : "190vh",
        backgroundColor: "#f5f2eb",
      }}
    >
      {/* Sticky Hero Viewport Container */}
      <div
        className={`${
          shouldReduceMotion ? "relative min-h-[750px]" : "sticky top-0 h-screen"
        } w-full overflow-hidden flex flex-col justify-between`}
      >
        {/* Layer 1: Architectural Backdrop with warm ivory sunlight */}
        <div data-hero-parallax className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/hero-extracted/backdrop.png"
            alt="Warm sunlit architectural studio background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform scale-[1.02]"
            style={{
              filter: "brightness(1.01) contrast(1.02)",
            }}
          />
          {/* Subtle warm ambient vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 30%, transparent 40%, rgba(220, 212, 198, 0.35) 100%)",
            }}
          />
        </div>

        {/* Editorial Text Layer (Top/Header Zone) */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Editorial Headline & Stance */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-4"
            >
              {/* Refined Eyebrow */}
              <div className="inline-flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#7c6853" }}
                />
                <span
                  className="text-[11px] font-mono tracking-[0.2em] uppercase"
                  style={{
                    color: "#6b5845",
                    fontWeight: 600,
                  }}
                >
                  THE CURATED EDIT
                </span>
                <span
                  className="text-[11px] font-mono tracking-wider opacity-60"
                  style={{ color: "#8a7b6c" }}
                >
                  / ISSUE NO. 04
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111110] text-balance leading-[1.04]"
                style={{
                  fontFamily: "Geist, system-ui, sans-serif",
                  letterSpacing: "-0.035em",
                }}
              >
                Better Finds.
                <br />
                <span
                  style={{
                    color: "#5b4c3b",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontFamily: "serif",
                  }}
                >
                  Less Guesswork.
                </span>
              </h1>

              {/* Supporting Editorial Deck */}
              <p
                className="text-base sm:text-lg max-w-xl text-[#4a4742] leading-relaxed pt-1"
                style={{
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Thoughtfully curated products for the way you live, work, and
                create. Discover standout finds without the endless scrolling.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 shadow-sm"
                  style={{
                    backgroundColor: "#181715",
                    color: "#faf8f4",
                    fontFamily: "Geist, sans-serif",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#322f2b";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#181715";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>Explore Collection</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#how-we-curate"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border active:scale-95"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.45)",
                    borderColor: "rgba(160, 145, 125, 0.35)",
                    color: "#282522",
                    fontFamily: "Geist, sans-serif",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
                    e.currentTarget.style.borderColor = "rgba(120, 100, 80, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.45)";
                    e.currentTarget.style.borderColor = "rgba(160, 145, 125, 0.35)";
                  }}
                >
                  <Compass className="w-3.5 h-3.5 text-[#6c5845]" />
                  <span>How We Curate</span>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Subtle Editorial Stats or Badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col items-end col-span-5 text-right space-y-3 pt-2"
            >
              <div
                className="px-4 py-2 rounded-full border text-xs font-medium"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderColor: "rgba(175, 160, 140, 0.35)",
                  color: "#463d33",
                  fontFamily: "Geist, sans-serif",
                  backdropFilter: "blur(6px)",
                }}
              >
                Zero Sponsored Placements · Tested In-Studio
              </div>
              <p
                className="text-xs text-[#73685c] max-w-[260px] leading-relaxed font-mono"
              >
                Every product verified for material authenticity, ergonomic precision, and longevity.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scene Area: Fixed perspective 3D/assembly stage */}
        <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[460px] md:min-h-[520px] max-w-[1400px] mx-auto px-2 sm:px-6">
          {/* Layer 2: Cream Stone Product Podium Stage */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 30 }}
            animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 top-[10%] flex items-end justify-center pointer-events-none z-10"
          >
            <div className="relative w-full max-w-[1180px] h-[75%] sm:h-[82%] md:h-[90%]">
              <Image
                src="/hero-extracted/podium-set.png"
                alt="Minimalist Cream Stone Product Podium Set with architectural arch and natural stone"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain object-bottom"
                style={{
                  filter:
                    "drop-shadow(0 35px 35px rgba(50, 40, 30, 0.22)) contrast(1.02)",
                }}
              />
            </div>
          </motion.div>

          {/* Layer 3: Independent Animated Products Layer */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="relative w-full h-full max-w-[1180px] mx-auto">
              {PRODUCTS.map((prod) => (
                <AnimatedProductItem
                  key={prod.id}
                  config={prod}
                  scrollYProgress={scrollYProgress}
                  reducedMotion={shouldReduceMotion ?? false}
                  mounted={mounted}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom subtle progress & scroll invitation */}
        <div className="relative z-30 pb-4 px-8 flex justify-between items-center text-[11px] font-mono text-[#827568]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#827568]/40 animate-pulse" />
            <span className="hidden sm:inline">Scroll to assemble composition</span>
            <span className="sm:hidden">Scroll to discover</span>
          </div>

          <div className="flex items-center gap-3">
            <span>6 CURATED OBJECTS</span>
            <span className="opacity-30">|</span>
            <span>AUTUMN / WINTER</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Animated Product Component
 * Combines smooth page-load entrance stagger with reactive scroll mapping
 */
function AnimatedProductItem({
  config,
  scrollYProgress,
  reducedMotion,
  mounted,
}: {
  config: ProductConfig;
  scrollYProgress: any;
  reducedMotion: boolean;
  mounted: boolean;
}) {
  const [start, end] = config.scrollRange;

  // Scroll transforms: interpolates between arrival delta and 0 (resting position)
  const scrollX = useTransform(scrollYProgress, [start, end], [config.entrance.x, 0]);
  const scrollY = useTransform(scrollYProgress, [start, end], [config.entrance.y, 0]);
  const scrollRotate = useTransform(
    scrollYProgress,
    [start, end],
    [config.rest.rotate + config.entrance.rotate, config.rest.rotate]
  );
  const scrollScale = useTransform(
    scrollYProgress,
    [start, end],
    [config.rest.scale * config.entrance.scale, config.rest.scale]
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, end],
    [0.4, 0.9, 1]
  );

  // If reduced motion is requested, render statically at perfect resting position
  if (reducedMotion) {
    return (
      <div
        className="absolute transition-transform duration-300"
        style={{
          left: config.rest.left,
          top: config.rest.top,
          transform: `translate(-50%, -50%) scale(${config.rest.scale}) rotate(${config.rest.rotate}deg)`,
          zIndex: config.zIndex,
        }}
      >
        <div
          style={{
            filter: `${config.shadow} ${config.filter}`,
          }}
        >
          <Image
            src={config.src}
            alt={config.name}
            width={config.width}
            height={config.height}
            priority
            className="w-auto h-auto max-w-[180px] sm:max-w-[240px] md:max-w-[320px] select-none"
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        left: config.rest.left,
        top: config.rest.top,
        x: scrollX,
        y: scrollY,
        scale: scrollScale,
        rotate: scrollRotate,
        opacity: scrollOpacity,
        zIndex: config.zIndex,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{
        opacity: 0,
        x: config.entrance.x * 1.3,
        y: config.entrance.y * 1.3,
      }}
      animate={
        mounted
          ? {
              opacity: 1,
              x: config.entrance.x,
              y: config.entrance.y,
            }
          : {}
      }
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        style={{
          filter: `${config.shadow} ${config.filter}`,
        }}
        className="transition-transform duration-300 hover:scale-105 pointer-events-auto cursor-pointer"
        title={`${config.name} — ${config.category}`}
      >
        <Image
          src={config.src}
          alt={config.name}
          width={config.width}
          height={config.height}
          priority
          className="w-auto h-auto max-w-[130px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[330px] select-none pointer-events-none"
        />
      </div>
    </motion.div>
  );
}
