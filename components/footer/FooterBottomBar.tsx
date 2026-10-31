import React from "react";
import Link from "next/link";

export function FooterBottomBar() {
  return (
    <div className="flex flex-col gap-3 text-[10px] text-[#5b544b] sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} SmartGearPicks. All rights reserved.</p>
      <nav aria-label="Legal links" className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/privacy" className="transition-colors hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6853]">Privacy Policy</Link>
        <Link href="/terms" className="transition-colors hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6853]">Terms of Service</Link>
        <Link href="/privacy#affiliate-disclosure" className="transition-colors hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c6853]">Affiliate Disclosure</Link>
      </nav>
    </div>
  );
}
