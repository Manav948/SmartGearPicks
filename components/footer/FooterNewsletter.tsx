"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Check, Loader2, ChevronRight } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4500);
  };

  return (
    <div className="md:col-span-5 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight select-none inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity text-[#151515]"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            <span className="w-8 h-8 rounded-xl bg-linear-to-br from-[#6b5845] via-[#7c6853] to-[#a99a86] p-px flex items-center justify-center shadow-lg shadow-[#7c6853]/20">
              <span className="w-full h-full bg-[#F7F6F2] rounded-[11px] flex items-center justify-center text-[#a99a86] font-extrabold text-sm">
                S
              </span>
            </span>
            <span>SmartGearPicks</span>
          </Link>
          
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7c6853]/10 border border-[#7c6853]/20 text-[10px] font-medium text-[#7c6853]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7c6853] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b5845]"></span>
            </span>
            Live Index
          </span>
        </div>

        <p
          className="text-xs leading-relaxed text-[#6B6B6B] max-w-sm"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Empowering creators, developers, and professionals to build their dream setups with handpicked hardware, desk gear, and software.
        </p>
      </div>

      <div className="max-w-md p-5 rounded-2xl bg-[#FAF8F4] border border-[#E5E1DA] backdrop-blur-xl shadow-xl relative overflow-hidden group hover:border-[#a99a86]/60 transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#F0EDE7]0/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[11px] font-bold uppercase tracking-wider text-[#a99a86] flex items-center gap-1.5"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Curator Digest
          </span>
          <span className="text-[10px] text-[#817e75] font-mono">Weekly Drops</span>
        </div>
        
        <h4 className="text-sm font-semibold text-[#151515] mb-3" style={{ fontFamily: "Geist, sans-serif" }}>
          Get handpicked gear drops straight to your inbox
        </h4>
        
        {subscribed ? (
          <div className="flex items-center gap-2.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Check className="w-4 h-4 shrink-0 text-[#7c6853]" />
            <span>You're in! Check your inbox for our latest picks.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none border transition-all duration-200 placeholder-zinc-500 bg-[#F7F6F2]/80 border-[#E5E1DA] hover:border-zinc-700 focus:border-[#7c6853] focus:bg-[#F7F6F2] focus:ring-2 focus:ring-[#7c6853]/20 text-[#151515]"
                required
                disabled={isSubmitting}
              />
              <Mail className="w-3.5 h-3.5 text-[#817e75] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.97] bg-linear-to-r from-[#6b5845] via-[#7c6853] to-[#a99a86] hover:from-[#7c6853] hover:to-[#a99a86] text-[#151515] shadow-lg shadow-[#7c6853]/20 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 border border-[#a99a86]/20 shrink-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
