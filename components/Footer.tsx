import React from "react";
import { FooterNavLinks } from "./footer/FooterNavLinks";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer
      className="w-full mt-24 border-t"
      style={{
        backgroundColor: "#f8f9ff",
        color: "#0b1c30",
        borderColor: "rgba(199, 196, 215, 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 flex flex-col gap-12">
       
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
         
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
           
              <div
                className="w-10 h-10 rounded-xl text-white font-extrabold text-xl flex items-center justify-center shadow-sm select-none border border-slate-800"
                style={{ backgroundColor: "#0f172a", fontFamily: "Geist, sans-serif" }}
              >
                S
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
                >
                  SmartGearPicks
                </span>
                <span className="text-[11px] font-medium" style={{ color: "#767586" }}>
                  Curated Equipment & Tech Recommendations
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-md mt-1" style={{ color: "#464554" }}>
              Skip the noise. We curate and recommend top-tier workspace gear, productivity tools, and tech essentials built for modern creators.
            </p>
          </div>

      
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterNavLinks />
          </div>
        </div>

      
        <div className="border-t pt-8" style={{ borderColor: "rgba(199, 196, 215, 0.4)" }}>
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
