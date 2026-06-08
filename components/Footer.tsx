"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer
      className="w-full mt-20 border-t py-16 px-4 md:px-8"
      style={{
        backgroundColor: "#0b1c30",
        borderColor: "rgba(255, 255, 255, 0.08)",
        color: "#f8f9ff",
      }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        {/* Top Section: Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Info & Newsletter (4 cols) */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div>
              <Link
                href="/"
                className="text-2xl font-bold tracking-tighter select-none"
                style={{ fontFamily: "Geist, sans-serif", color: "#ffffff" }}
              >
                SmartGearPicks
              </Link>
              <p
                className="text-sm mt-3 leading-relaxed max-w-sm"
                style={{ color: "#94a3b8", fontFamily: "Inter, sans-serif" }}
              >
                Skip the endless scrolling and confusing reviews. We discover, test, and curate only the exceptional tools, lifestyle objects, and tech that elevate your daily routine.
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="max-w-sm">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#818cf8", fontFamily: "Geist, sans-serif" }}
              >
                Get Curator Weekly
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs outline-none border transition-all"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                  }}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 whitespace-nowrap"
                  style={{
                    backgroundColor: "#4648d4",
                    color: "#ffffff",
                    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Explore (2 cols) */}
          <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
            <h4
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#818cf8", fontFamily: "Geist, sans-serif" }}
            >
              Explore
            </h4>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "#94a3b8" }}>
              <Link href="/#products" className="transition-colors hover:text-white">
                All Products
              </Link>
              <Link href="/#products" className="transition-colors hover:text-white">
                New Arrivals
              </Link>
              <Link href="/#products" className="transition-colors hover:text-white">
                Trending Gear
              </Link>
              <Link href="/login" className="transition-colors hover:text-white">
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Column 3: Categories (2 cols) */}
          <div className="md:col-span-2 col-span-1 flex flex-col gap-4">
            <h4
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#818cf8", fontFamily: "Geist, sans-serif" }}
            >
              Top Categories
            </h4>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "#94a3b8" }}>
              <Link href="/#products" className="transition-colors hover:text-white">
                Electronics
              </Link>
              <Link href="/#products" className="transition-colors hover:text-white">
                Fashion & Style
              </Link>
              <Link href="/#products" className="transition-colors hover:text-white">
                Home & Kitchen
              </Link>
              <Link href="/#products" className="transition-colors hover:text-white">
                Creator Essentials
              </Link>
            </div>
          </div>

          {/* Column 4: Trust & Editorial (3 cols) */}
          <div className="md:col-span-3 col-span-1 flex flex-col gap-4">
            <h4
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#818cf8", fontFamily: "Geist, sans-serif" }}
            >
              Curation Trust
            </h4>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "#94a3b8" }}>
              <Link href="#" className="transition-colors hover:text-white">
                Our Editorial Process
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Redirection Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
        />

        {/* Bottom Section: Copyright & FTC Disclosure */}
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          <div className="text-xs max-w-2xl" style={{ color: "#64748b" }}>
            <p className="mb-2">
              © {new Date().getFullYear()} SmartGearPicks. All rights reserved. Handpicked Curation for the modern workspace and daily life.
            </p>
            <p className="leading-relaxed">
              <strong>Affiliate Disclosure:</strong> As an associate and curator, we earn from qualifying purchases. When you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission. Affiliate programs and affiliations include, but are not limited to, the eBay Partner Network, Amazon Associates, and others.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 text-xs" style={{ color: "#94a3b8" }}>
            <a href="#" className="transition-colors hover:text-white">
              Contact Editor
            </a>
            <span>•</span>
            <a href="#" className="transition-colors hover:text-white">
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
