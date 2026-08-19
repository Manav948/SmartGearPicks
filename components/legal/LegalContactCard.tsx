import React from "react";
import { Mail, ArrowUpRight } from "lucide-react";

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
  const mailHref = buttonHref || `mailto:${email}`;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800/90 rounded-2xl p-6 backdrop-blur-md">
      <p className="text-xs text-zinc-400 mb-4">{description}</p>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl">
        <div className="space-y-1 text-xs">
          <div className="text-white font-semibold flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>{officeName}</span>
          </div>
          <div className="text-zinc-400">
            Email:{" "}
            <a href={`mailto:${email}`} className="text-indigo-400 hover:underline font-medium">
              {email}
            </a>
          </div>
          <div className="text-zinc-400">
            Website: <span className="text-zinc-200">{websiteUrl}</span>
          </div>
        </div>

        <a
          href={mailHref}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all active:scale-95 shrink-0 shadow-sm"
        >
          <span>{buttonLabel}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
