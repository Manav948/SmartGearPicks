"use client";

import React, { useState } from "react";
import { Mail, ArrowUpRight, Copy, Check } from "lucide-react";

interface LegalContactCardProps {
  officeName?: string;
  email: string;
  websiteUrl?: string;
  buttonLabel?: string;
  buttonHref?: string;
  description?: string;
}

export function LegalContactCard({
  officeName = "SmartGearPicks Compliance Office",
  email,
  websiteUrl = "https://smartgearpicks.com",
  buttonLabel = "Email Privacy Team",
  buttonHref,
  description = "If you have questions, comments, or compliance concerns regarding this policy, feel free to reach out directly to our team.",
}: LegalContactCardProps) {
  const [copied, setCopied] = useState(false);
  const mailHref = buttonHref || `mailto:${email}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-xs" style={{ borderColor: "rgba(199, 196, 215, 0.4)" }}>
      <p className="text-xs mb-4" style={{ color: "#464554" }}>{description}</p>

      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-4 rounded-xl"
        style={{ backgroundColor: "#eff4ff", borderColor: "rgba(199, 196, 215, 0.4)" }}
      >
        <div className="space-y-1 text-xs">
          <div className="font-semibold flex items-center gap-1.5" style={{ color: "#0b1c30" }}>
            <Mail className="w-3.5 h-3.5 text-[#4648d4]" />
            <span>{officeName}</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: "#464554" }}>
            <span>Email:</span>
            <a href={`mailto:${email}`} className="font-semibold hover:underline" style={{ color: "#4648d4" }}>
              {email}
            </a>
            <button
              onClick={handleCopy}
              className="p-1 rounded bg-white text-slate-600 hover:text-[#4648d4] border border-slate-200 transition-colors cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
          <div style={{ color: "#464554" }}>
            Website: <span className="font-medium" style={{ color: "#0b1c30" }}>{websiteUrl}</span>
          </div>
        </div>

        <a
          href={mailHref}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-xs font-medium transition-all active:scale-95 shrink-0 shadow-xs"
          style={{ backgroundColor: "#0f172a", fontFamily: "Geist, sans-serif" }}
        >
          <span>{buttonLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
