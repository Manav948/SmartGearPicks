import React from "react";
import { ShieldCheck, Sparkles, SlidersHorizontal, Eye } from "lucide-react";

export default function CurationProcess() {
  const pillars = [
    {
      icon: Eye,
      title: "Discovery & Sourcing",
      desc: "We monitor global design studios, independent tech innovators, and craft ateliers to locate exceptional gear that stands apart from mass-market noise.",
    },
    {
      icon: ShieldCheck,
      title: "Real-World Testing",
      desc: "Every recommendation undergoes weeks of rigorous everyday testing for build integrity, tactile ergonomics, and everyday reliability before consideration.",
    },
    {
      icon: SlidersHorizontal,
      title: "Design & Utility Audit",
      desc: "We prioritize clean aesthetics, timeless materials, and effortless utility. If a product doesn't genuinely elevate daily routines, it doesn't make the cut.",
    },
    {
      icon: Sparkles,
      title: "Uncompromising Edit",
      desc: "Less than 3% of reviewed products earn a spot on SmartGearPicks. We curate fewer, better things so you spend zero time second-guessing.",
    },
  ];

  return (
    <section
      data-scroll-reveal
      id="how-we-curate"
      className="py-16 md:py-24 border-y relative overflow-hidden"
      style={{
        backgroundColor: "#f5f3ec",
        borderColor: "rgba(229, 225, 218, 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div data-scroll-reveal-item className="max-w-2xl mb-12 md:mb-16">
          <span
            className="text-xs font-semibold tracking-widest uppercase block mb-3"
            style={{
              fontFamily: "Geist, sans-serif",
              color: "#786550",
              letterSpacing: "0.15em",
            }}
          >
            EDITORIAL INTEGRITY
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111110]"
            style={{ fontFamily: "Geist, sans-serif", letterSpacing: "-0.03em" }}
          >
            How We Curate
          </h2>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed text-[#55524c]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We eliminate analysis paralysis with an exacting standard of utility, aesthetic harmony, and material craftsmanship. Here is our four-stage evaluation methodology.
          </p>
        </div>

        <div data-scroll-reveal-item className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-md"
                style={{
                  backgroundColor: "#faf8f4",
                  borderColor: "rgba(180, 170, 155, 0.35)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: "rgba(120, 101, 80, 0.1)",
                    color: "#5c4832",
                  }}
                >
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div
                  className="text-xs font-mono mb-2"
                  style={{ color: "#8a7b6c" }}
                >
                  0{idx + 1}
                </div>
                <h3
                  className="text-lg font-medium mb-3 text-[#111110]"
                  style={{ fontFamily: "Geist, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed text-[#636058]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
