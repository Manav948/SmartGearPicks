"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Award, ArrowUp, Mail, Check, Loader2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    
    // Simulate API request delay for a premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="w-full mt-24 border-t relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #0b1c30 0%, #071220 50%, #03080e 100%)",
        borderColor: "rgba(255, 255, 255, 0.06)",
        color: "#f8f9ff",
      }}
    >
      {/* Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-16 relative z-10">
        
        {/* Section 1: Trust Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4 p-6 rounded-2xl bg-white/2 border border-white/4 backdrop-blur-sm transition-all hover:bg-white/4 hover:border-white/6">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-1.5 text-white" style={{ fontFamily: "Geist, sans-serif" }}>
                Expert-Level Curation
              </h5>
              <p className="text-xs leading-relaxed text-slate-400">
                We discover, test, and handpick only the top-tier gear, productivity tools, and aesthetic setup essentials.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 rounded-2xl bg-white/2 border border-white/4 backdrop-blur-sm transition-all hover:bg-white/4 hover:border-white/6">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-1.5 text-white" style={{ fontFamily: "Geist, sans-serif" }}>
                100% Honest Assessments
              </h5>
              <p className="text-xs leading-relaxed text-slate-400">
                No sponsored tier lists, fake reviews, or paid product placements. If it isn't exceptional, it doesn't make the cut.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-6 rounded-2xl bg-white/2 border border-white/4 backdrop-blur-sm transition-all hover:bg-white/4 hover:border-white/6">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-1.5 text-white" style={{ fontFamily: "Geist, sans-serif" }}>
                Transparent Affiliate Links
              </h5>
              <p className="text-xs leading-relaxed text-slate-400">
                We stay reader-supported. We earn a small partner commission on some items without ever costing you extra.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4 border-t border-white/4">
          {/* Brand Info & Newsletter (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight select-none inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ fontFamily: "Geist, sans-serif", color: "#ffffff" }}
              >
                SmartGearPicks
              </Link>
              <p
                className="text-sm leading-relaxed max-w-sm text-slate-400"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Empowering creators and professionals to make better hardware and software choices. Skip the endless scrolling and get curated recommendations instantly.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="max-w-sm p-5 rounded-2xl bg-white/1 border border-white/4 backdrop-blur-md">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1 text-indigo-400"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Curator Digest
              </p>
              <h4 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: "Geist, sans-serif" }}>
                Get expert gear drops in your inbox
              </h4>
              
              {subscribed ? (
                <div className="flex items-center gap-2.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl animate-in fade-in duration-300">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none border transition-all placeholder-slate-500 bg-white/5 border-white/10 hover:border-white/20 focus:border-indigo-500 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500 text-white"
                      required
                      disabled={isSubmitting}
                    />
                    <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 hover:bg-indigo-500 bg-indigo-600 text-white shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Column 1: Navigation */}
          <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-indigo-400"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Explore
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                All Products
              </Link>
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                New Arrivals
              </Link>
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Trending Gear
              </Link>
              <Link href="/login" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Links Column 2: Categories */}
          <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-indigo-400"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Categories
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Electronics
              </Link>
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Creator Setup
              </Link>
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Office & Desk
              </Link>
              <Link href="/#products" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Home & Kitchen
              </Link>
            </div>
          </div>

          {/* Links Column 3: Trust & Process */}
          <div className="md:col-span-3 col-span-1 flex flex-col gap-4">
            <h4
              className="text-xs font-bold uppercase tracking-wider text-indigo-400"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Editorial & Trust
            </h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Our Editorial Process
              </Link>
              <Link href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Redirection Policy
              </Link>
              <Link href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-all duration-200 hover:text-white hover:translate-x-1">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Section 3: Legal Disclosures & Social & Copyright */}
        <div className="border-t pt-8 flex flex-col gap-8" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
          
          {/* FTC Disclosure Card */}
          <div className="p-4 rounded-xl bg-white/1 border border-white/3 text-xs leading-relaxed text-slate-500">
            <div className="flex items-center gap-2 mb-1.5 text-slate-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>FTC Affiliate Disclosure</span>
            </div>
            SmartGearPicks is an independent curation site. We earn commissions from qualifying purchases made through our referral links to merchant websites including Amazon Associates, eBay Partner Network, and other affiliate programs. This helps us maintain our deep review standards and keep the platform ad-free.
          </div>

          {/* Bottom Bar: Copyright, Socials, Back to Top */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs text-slate-500 text-center md:text-left order-3 md:order-1">
              © {new Date().getFullYear()} SmartGearPicks. Built for modern workspaces. All rights reserved.
            </div>

            {/* Social Connect Icons */}
            <div className="flex items-center gap-3 order-1 md:order-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                title="Follow us on X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                title="Follow us on GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                title="Connect on LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            {/* Back to Top */}
            <div className="order-2 md:order-3">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 cursor-pointer text-xs font-semibold"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-indigo-400" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
