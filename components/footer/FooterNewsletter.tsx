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
            className="text-2xl font-bold tracking-tight select-none inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity text-white"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-indigo-400 font-extrabold text-sm">
                S
              </span>
            </span>
            <span>SmartGearPicks</span>
          </Link>
          
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Index
          </span>
        </div>

        <p
          className="text-xs leading-relaxed text-zinc-400 max-w-sm"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Empowering creators, developers, and professionals to build their dream setups with handpicked hardware, desk gear, and software.
        </p>
      </div>

      <div className="max-w-md p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 backdrop-blur-xl shadow-xl relative overflow-hidden group hover:border-zinc-700/80 transition-all duration-300">
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            <Zap className="w-3.5 h-3.5" />
            Curator Digest
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">Weekly Drops</span>
        </div>
        
        <h4 className="text-sm font-semibold text-zinc-100 mb-3" style={{ fontFamily: "Geist, sans-serif" }}>
          Get handpicked gear drops straight to your inbox
        </h4>
        
        {subscribed ? (
          <div className="flex items-center gap-2.5 text-xs text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
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
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none border transition-all duration-200 placeholder-zinc-500 bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 focus:bg-zinc-950 focus:ring-2 focus:ring-indigo-500/20 text-zinc-100"
                required
                disabled={isSubmitting}
              />
              <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.97] bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 border border-indigo-400/20 shrink-0"
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
