import React from "react";
import { Award, ShieldCheck, Sparkles } from "lucide-react";

export function FooterTrustHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     
      <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-indigo-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/3 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-all duration-300 shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm text-zinc-100 flex items-center gap-1.5" style={{ fontFamily: "Geist, sans-serif" }}>
              Expert Curation
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-80" />
            </h5>
            <p className="text-xs leading-relaxed text-zinc-400">
              We rigorously test and handpick top-tier gear, productivity tools, and modern setup essentials.
            </p>
          </div>
        </div>
      </div>

   
      <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-lienar-to-b from-white/3 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-all duration-300 shadow-inner">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm text-zinc-100 flex items-center gap-1.5" style={{ fontFamily: "Geist, sans-serif" }}>
              100% Honest Reviews
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80" />
            </h5>
            <p className="text-xs leading-relaxed text-zinc-400">
              No sponsored tier lists or fake ratings. Only products that meet strict quality standards get recommended.
            </p>
          </div>
        </div>
      </div>

     
      <div className="group relative p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5 hover:-translate-y-1">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/3 to-transparent pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/50 group-hover:bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-all duration-300 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1">
            <h5 className="font-semibold text-sm text-zinc-100 flex items-center gap-1.5" style={{ fontFamily: "Geist, sans-serif" }}>
              Transparent Partners
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 opacity-80" />
            </h5>
            <p className="text-xs leading-relaxed text-zinc-400">
              Reader-supported through official referral links. No hidden charges or extra cost to you ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
