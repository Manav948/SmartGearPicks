import React from "react";

export default function Hero() {
  return (
    <header className="relative pt-10 md:pt-20 pb-16 md:pb-28 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        <div className="lg:col-span-6 z-10 space-y-8">
          <div
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wider uppercase"
            style={{
              backgroundColor: "rgba(70,72,212,0.08)",
              color: "#4648d4",
              borderColor: "rgba(70,72,212,0.2)",
              fontFamily: "Geist, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            <span
              className="material-symbols-outlined text-[16px] mr-1.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            Curated Excellence
          </div>

          <h1
            className="text-balance leading-[1.05] tracking-tight"
            style={{
              fontFamily: "Geist, system-ui, sans-serif",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#0b1c30",
            }}
          >
            Handpicked Products Worth Buying
          </h1>

          <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#464554", letterSpacing: "-0.01em" }}>
            Skip the endless scrolling and confusing reviews. We discover, test, and curate only the exceptional
            tools, lifestyle objects, and tech that elevate your daily routine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-sm"
              style={{
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontFamily: "Geist, sans-serif",
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Explore Collection
            </a>
            <button
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-medium border transition-all active:scale-95"
              style={{
                backgroundColor: "#f8f9ff",
                color: "#0b1c30",
                borderColor: "#c7c4d7",
                fontFamily: "Geist, sans-serif",
              }}
            >
              Our Curation Process
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative mt-12 lg:mt-0">
          <div
            className="absolute inset-0 rounded-[40px] transform rotate-3 scale-105 -z-10"
            style={{ backgroundColor: "rgba(70,72,212,0.05)" }}
          />
          <div
            className="relative rounded-[32px] overflow-hidden border aspect-4/5 md:aspect-auto md:h-[580px] w-full group shadow-2xl"
            style={{
              borderColor: "rgba(199,196,215,0.25)",
              boxShadow: "0 25px 50px -12px rgba(70,72,212,0.12)",
            }}
          >
            <img
              src="/hero.png"
              alt="Workspace Essentials"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />

            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-linear-to-t from-black/40 via-black/10 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded"
                  style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff", fontFamily: "Geist, sans-serif" }}
                >
                  Workspace Essentials
                </span>
              </div>
              <h3 className="text-white text-xl font-semibold" style={{ fontFamily: "Geist, sans-serif" }}>
                Curated For Excellence
              </h3>
              <p className="text-white/80 text-sm mt-1">Discover our editor&apos;s top picks</p>
            </div>

            <div
              className="absolute bottom-8 left-8 p-4 rounded-xl flex items-center gap-3 max-w-[240px]"
              style={{
                background: "rgba(248,249,255,0.82)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(199,196,215,0.4)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: "#4648d4" }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                >
                  Editor&apos;s Choice
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#464554" }}>
                  Handpicked Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
