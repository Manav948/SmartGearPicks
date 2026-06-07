"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.97]"
      style={{
        fontFamily: "Geist, sans-serif",
        color: "#767586",
        backgroundColor: "transparent",
        border: "1px solid rgba(199,196,215,0.5)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#ffffff";
        (e.currentTarget as HTMLElement).style.color = "#0b1c30";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
        (e.currentTarget as HTMLElement).style.color = "#767586";
      }}
    >
      <span
        className="material-symbols-outlined text-[18px]"
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        logout
      </span>
      Log Out
    </button>
  );
}
