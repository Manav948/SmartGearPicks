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
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <p className="text-xs text-zinc-600 mb-4">{description}</p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50 border border-zinc-200 p-4 rounded-xl">
        <div className="space-y-1 text-xs">
          <div className="text-zinc-900 font-semibold flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-900" />
            <span>{officeName}</span>
          </div>
          <div className="text-zinc-600 flex items-center gap-2">
            <span>Email:</span>
            <a href={`mailto:${email}`} className="text-black font-semibold hover:underline">
              {email}
            </a>
            <button
              onClick={handleCopy}
              className="p-1 rounded bg-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-300 transition-colors cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? (
                <Check className="w-3 h-3 text-black" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
          <div className="text-zinc-600">
            Website: <span className="text-zinc-900 font-medium">{websiteUrl}</span>
          </div>
        </div>

        <a
          href={mailHref}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold transition-all active:scale-95 shrink-0 shadow-sm"
        >
          <span>{buttonLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
