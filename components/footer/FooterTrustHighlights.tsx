import React from "react";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

export function FooterTrustHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     
      <div className="group relative p-6 rounded-2xl bg-[#FAF8F4] border border-[#E5E1DA] hover:border-[#7c6853]/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7c6853]/5 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/3 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F0EDE7]0/10 border border-[#7c6853]/20 group-hover:border-[#7c6853]/50 group-hover:bg-[#F0EDE7]0/20 flex items-center justify-center text-[#a99a86] group-hover:scale-110 transition-all duration-300 shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm text-[#151515] flex items-center gap-1.5" style={{ fontFamily: "Geist, sans-serif" }}>
              Expert Curation
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a99a86] opacity-80" />
            </h5>
            <p className="text-xs leading-relaxed text-[#6B6B6B]">
              We rigorously test and handpick top-tier gear, productivity tools, and modern setup essentials.
            </p>
          </div>
        </div>
      </div>

   
      <div className="group relative p-6 rounded-2xl bg-[#FAF8F4] border border-[#E5E1DA] hover:border-[#7c6853]/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#7c6853]/5 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-lienar-to-b from-white/3 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-[#7c6853]/10 border border-[#7c6853]/20 group-hover:border-emerald-500/50 group-hover:bg-[#6b5845]/20 flex items-center justify-center text-[#7c6853] group-hover:scale-110 transition-all duration-300 shadow-inner">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm text-[#151515] flex items-center gap-1.5" style={{ fontFamily: "Geist, sans-serif" }}>
              100% Honest Reviews
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7c6853] opacity-80" />
            </h5>
            <p className="text-xs leading-relaxed text-[#6B6B6B]">
              No sponsored tier lists or fake ratings. Only products that meet strict quality standards get recommended.
            </p>
          </div>
        </div>
      </div>

     
      <div className="group relative p-6 rounded-2xl bg-[#FAF8F4] border border-[#E5E1DA] hover:border-[#a99a86]/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#a99a86]/5 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/3 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-[#a99a86]/10 border border-[#a99a86]/20 group-hover:border-[#a99a86]/50 group-hover:bg-[#a99a86]/15 flex items-center justify-center text-[#a99a86] group-hover:scale-110 transition-all duration-300 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm text-[#151515] flex items-center gap-1.5" style={{ fontFamily: "Geist, sans-serif" }}>
              Transparent Partners
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#a99a86] opacity-80" />
            </h5>
            <p className="text-xs leading-relaxed text-[#6B6B6B]">
              Reader-supported through official referral links. No hidden charges or extra cost to you ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
