"use client";

import React, { useState } from "react";

const NAV_LINKS = [
  { label: "Discover", href: "#" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Trending", href: "#trending" },
  { label: "Curated Catalog", href: "#products" },
];

export default function Navbar() {
  const [active, setActive] = useState("Discover");
  const [pressed, setPressed] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setActive(label);
    setPressed(label);
    setTimeout(() => setPressed(null), 300);
  };

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes navRipple {
          0%   { transform: scale(0); opacity: 0.35; }
          60%  { transform: scale(2.2); opacity: 0.12; }
          100% { transform: scale(3); opacity: 0; }
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 2px;
          border-radius: 999px;
          background: #4648d4;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>

      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(248, 249, 255, 0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(199, 196, 215, 0.35)",
        }}
      >
        <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-[1280px] mx-auto w-full">
          <div
            className="text-2xl font-bold tracking-tighter shrink-0 mr-8 select-none"
            style={{ fontFamily: "Geist, system-ui, sans-serif", color: "#0b1c30" }}
          >
            SmartGearPicks
          </div>

          <div className="hidden md:flex flex-1 items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === label;
              const isHovered = hovered === label;
              const isPressed = pressed === label;
              return (
                <a
                  key={label}
                  href={href}
                  className={`nav-link-underline${isActive ? " active" : ""} relative text-sm px-3 py-2 rounded-lg select-none overflow-hidden`}
                  style={{
                    fontFamily: "Geist, sans-serif",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#4648d4" : isHovered ? "#4648d4" : "#464554",
                    background: isHovered && !isActive
                      ? "rgba(70,72,212,0.07)"
                      : isActive
                      ? "rgba(70,72,212,0.09)"
                      : "transparent",
                    transform: isPressed
                      ? "scale(0.94) translateY(1px)"
                      : isHovered
                      ? "translateY(-1px)"
                      : "translateY(0)",
                    transition:
                      "color 0.18s, background 0.18s, transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s",
                    boxShadow: isActive
                      ? "0 1px 6px rgba(70,72,212,0.10)"
                      : "none",
                  }}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleClick(label)}
                >
                  {/* click ripple */}
                  {isPressed && (
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "8px",
                        background: "rgba(70,72,212,0.18)",
                        animation: "navRipple 0.32s ease-out forwards",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  {label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden md:flex items-center px-4 py-2 rounded-full border w-64 transition-colors focus-within:border-[#4648d4]"
              style={{
                backgroundColor: "#eff4ff",
                borderColor: "rgba(199, 196, 215, 0.4)",
              }}
            >
              <span
                className="material-symbols-outlined mr-2 text-[20px] select-none"
                style={{ color: "#767586", fontVariationSettings: "'FILL' 0" }}
              >
                search
              </span>
              <input
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#767586]"
                placeholder="Search curated products..."
                type="text"
                style={{ color: "#0b1c30" }}
              />
            </div>

            <a
              href="/login"
              className="text-sm px-3 py-2 hidden sm:block transition-colors hover:text-[#4648d4]"
              style={{ color: "#464554", fontFamily: "Geist, sans-serif", fontWeight: 500 }}
            >
              Admin
            </a>

            <a
              href="#products"
              className="text-sm px-5 py-2.5 rounded-lg shadow-sm select-none"
              style={{
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontFamily: "Geist, sans-serif",
                fontWeight: 500,
                borderTop: "1px solid rgba(255,255,255,0.15)",
                transition: "background 0.15s, transform 0.12s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")
              }
              onMouseDown={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "scale(0.95)")
              }
              onMouseUp={(e) =>
                ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")
              }
            >
              Explore
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
