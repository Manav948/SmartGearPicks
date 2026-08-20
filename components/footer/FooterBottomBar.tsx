"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function FooterBottomBar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2">
      {/* Copyright & Legal Links */}
      <div className="text-xs text-zinc-600 text-center md:text-left order-3 md:order-1 font-medium flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1">
        <span>© {new Date().getFullYear()} SmartGearPicks. All rights reserved.</span>
        <span className="hidden sm:inline text-zinc-300">•</span>
        <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
        <span className="text-zinc-300">•</span>
        <a href="/terms" className="hover:text-black transition-colors">Terms of Service</a>
      </div>

      {/* Social Connect Buttons */}
      <div className="flex items-center gap-2.5 order-1 md:order-2">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-white hover:bg-black hover:border-black transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          title="Follow us on X (Twitter)"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-white hover:bg-black hover:border-black transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
          title="Follow us on GitHub"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>

      {/* Back to Top */}
      <div className="order-2 md:order-3">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-black border border-black text-white hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer text-xs font-semibold shadow-sm"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-zinc-300 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
}
