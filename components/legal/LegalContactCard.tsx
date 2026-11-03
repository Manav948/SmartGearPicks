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
  websiteUrl = "https://www.smartgearpicks.com",
  buttonLabel = "Email Compliance Team",
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
    <div className="bg-[#FFFFFF] border border-[#DDDCD3] rounded-md p-6 shadow-xs">
      <p className="text-xs mb-4 text-[#6B6B66]">{description}</p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#DDDCD3] p-4 rounded-sm bg-[#F6F4EF]">
        <div className="space-y-1 text-xs">
          <div className="font-semibold flex items-center gap-1.5 text-[#22231F]">
            <Mail className="w-3.5 h-3.5 text-[#354538]" />
            <span>{officeName}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6B6B66]">
            <span>Email:</span>
            <a
              href={`mailto:${email}`}
              className="font-semibold text-[#354538] hover:underline"
            >
              {email}
            </a>
            <button
              onClick={handleCopy}
              className="p-1 rounded bg-[#FFFFFF] text-[#6B6B66] hover:text-[#22231F] border border-[#DDDCD3] transition-colors cursor-pointer"
              title="Copy Email Address"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          </div>
          <div className="text-[#6B6B66]">
            Website: <span className="font-medium text-[#22231F]">{websiteUrl}</span>
          </div>
        </div>

        <a
          href={mailHref}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm bg-[#22231F] text-[#F6F4EF] text-xs font-medium transition-all hover:bg-[#354538] active:scale-95 shrink-0 shadow-xs"
        >
          <span>{buttonLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
