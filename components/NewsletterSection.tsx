"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      data-scroll-reveal
      className="border-b border-[#DDDCD3] bg-[#F6F4EF] py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-scroll-reveal-item
          className="mx-auto max-w-2xl rounded-lg border border-[#DDDCD3] bg-[#FFFFFF] p-8 sm:p-12 text-center shadow-[0_8px_30px_rgba(34,35,31,0.03)]"
        >
          {/* Eyebrow */}
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B66F52]">
            WEEKLY DIGEST
          </p>

          {/* Headline */}
          <h2
            id="newsletter-heading"
            className="font-display text-3xl font-medium tracking-tight text-[#22231F] sm:text-4xl"
          >
            Curated gear, delivered weekly.
          </h2>

          {/* Description — without "worth exploring" tell */}
          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-[#6B6B66]">
            Get newly indexed products, practical tools, and catalog updates delivered directly to your inbox.
          </p>

          {/* Form */}
          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 rounded-md bg-[#E5E9E0] p-4 text-xs sm:text-sm font-medium text-[#354538]">
              <CheckCircle size={18} className="text-[#354538]" />
              <span>Thank you for your interest. Newsletter dispatch is launching soon!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 mx-auto max-w-md">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B66]"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-sm border border-[#DDDCD3] bg-[#F6F4EF]/50 py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-[#22231F] placeholder:text-[#6B6B66] outline-none transition-colors focus:border-[#354538] focus:bg-[#FFFFFF] focus:ring-1 focus:ring-[#354538]"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-[#22231F] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#F6F4EF] transition-all hover:bg-[#354538] active:scale-95 shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Supporting text — plain subscriber notice without "No clutter" slogan */}
              <p className="mt-3 text-[11px] text-[#6B6B66]">
                Published weekly. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
