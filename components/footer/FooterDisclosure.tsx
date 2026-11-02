import React from "react";

export function FooterDisclosure() {
  return (
    <div className="rounded-sm border border-[#DDDCD3]/60 bg-[#FFFFFF]/60 p-3.5 backdrop-blur-xs">
      <p className="text-[11px] leading-relaxed text-[#6B6B66]">
        <strong className="font-semibold text-[#22231F]">Affiliate Notice:</strong>{" "}
        As an Amazon Associate I earn from qualifying purchases. SmartGearPicks may also earn
        commissions through other affiliate programs. SmartGearPicks is an independent website
        and is not owned, operated, or endorsed by Amazon.
      </p>
    </div>
  );
}
