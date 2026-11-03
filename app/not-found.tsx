import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublicMotionProvider from "@/components/PublicMotionProvider";

export default function NotFound() {
  return (
    <PublicMotionProvider>
      <div className="min-h-screen flex flex-col bg-[#F6F4EF] text-[#22231F]">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="max-w-md w-full text-center">
            {/* 404 Badge */}
            <span className="inline-block rounded-full border border-[#DDDCD3] bg-[#E5E9E0] px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#354538]">
              404 Error
            </span>

            {/* Main Heading */}
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#22231F]">
              Page Not Found
            </h1>

            {/* Explanation */}
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#6B6B66]">
              The page or curated product you are looking for may have been moved, renamed,
              or is no longer part of our active collection.
            </p>

            {/* Navigation Options */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-[#22231F] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#F6F4EF] transition-all hover:bg-[#354538] active:scale-95 shadow-xs"
              >
                <Home size={15} />
                <span>Return to Home</span>
              </Link>

              <Link
                href="/catalog"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-[#DDDCD3] bg-[#FFFFFF] px-5 py-2.5 text-xs sm:text-sm font-medium text-[#22231F] transition-all hover:bg-[#E5E9E0] hover:border-[#354538] active:scale-95"
              >
                <Search size={15} />
                <span>Explore Catalog</span>
              </Link>
            </div>

            {/* Subtle help link */}
            <div className="mt-8 border-t border-[#DDDCD3]/60 pt-6">
              <p className="text-xs text-[#6B6B66]">
                Need assistance?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[#354538] underline decoration-[#DDDCD3] underline-offset-4 hover:text-[#22231F]"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PublicMotionProvider>
  );
}

