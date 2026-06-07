import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInCard from "@/components/auth/SignInCard";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "#f8f9ff" }}
    >
      <main className="w-full max-w-[440px] flex flex-col items-center">
        {/* Brand Identity */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: "#0b1c30", color: "#f8f9ff" }}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              storefront
            </span>
          </div>
          <h1
            className="text-2xl font-medium tracking-tight mt-2"
            style={{
              fontFamily: "Geist, system-ui, sans-serif",
              color: "#0b1c30",
              letterSpacing: "-0.02em",
            }}
          >
            SmartyGearPicks
          </h1>
          <p className="text-sm" style={{ color: "#767586" }}>
            Admin Portal Access
          </p>
        </div>

        {/* Login Card */}
        <div
          className="w-full rounded-xl border p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 relative overflow-hidden transition-shadow hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)]"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "rgba(199, 196, 215, 0.4)",
          }}
        >
          <SignInCard />

          {/* Secure footer note */}
          <div
            className="text-center border-t pt-5"
            style={{ borderColor: "rgba(199,196,215,0.35)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5"
              style={{
                fontFamily: "Geist, sans-serif",
                color: "#c4c7c9",
                letterSpacing: "0.05em",
              }}
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                lock
              </span>
              Secure Encrypted Connection
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}