import React from "react";
import { FooterNavLinks } from "./footer/FooterNavLinks";
import { FooterBottomBar } from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer
      className="w-full mt-24 border-t"
      style={{
        backgroundColor: "#F7F6F2",
        color: "#151515",
        borderColor: "rgba(229, 225, 218, 0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 flex flex-col gap-12">
       
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
         
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
           
              <div
                className="w-10 h-10 rounded-xl text-[#F7F6F2] font-extrabold text-xl flex items-center justify-center shadow-sm select-none border border-[#E5E1DA]"
                style={{ backgroundColor: "#191816", fontFamily: "Geist, sans-serif" }}
              >
                S
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-bold tracking-tight"
                  style={{ fontFamily: "Geist, sans-serif", color: "#151515" }}
                >
                  SmartGearPicks
                </span>
                <span className="text-[11px] font-medium" style={{ color: "#6B6B6B" }}>
                  Curated Equipment & Tech Recommendations
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-md mt-1" style={{ color: "#6B6B6B" }}>
              Skip the noise. We curate and recommend top-tier workspace gear, productivity tools, and tech essentials built for modern creators.
            </p>
          </div>

      
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterNavLinks />
          </div>
        </div>

      
        <div className="border-t pt-8" style={{ borderColor: "rgba(229, 225, 218, 0.4)" }}>
          <FooterBottomBar />
        </div>
      </div>
    </footer>
  );
}
