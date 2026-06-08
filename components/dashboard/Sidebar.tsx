"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "add_box", label: "Add Product", href: "/dashboard/add-product" },
    { icon: "storefront", label: "View Store", href: "/dashboard/store" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header Bar */}
      <header
        className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b w-full"
        style={{
          backgroundColor: "rgba(248,249,255,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "rgba(199,196,215,0.35)",
        }}
      >
        <Link
          href="/dashboard"
          className="text-lg font-bold tracking-tighter"
          style={{ fontFamily: "Geist, sans-serif", color: "#0b1c30" }}
        >
          SmartGearPicks Admin
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-lg border flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
          style={{
            borderColor: "rgba(199,196,215,0.5)",
            backgroundColor: "#ffffff",
          }}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <nav
        className={`fixed md:sticky top-0 left-0 h-screen w-64 flex flex-col gap-4 p-4 border-r z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ backgroundColor: "#eff4ff", borderColor: "rgba(199,196,215,0.25)" }}
      >
        {/* Brand/Header */}
        <div className="flex items-center gap-3 mb-4 pt-2">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center border shrink-0"
            style={{ backgroundColor: "#d3e4fe", borderColor: "rgba(199,196,215,0.4)", color: "#4648d4" }}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              person
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-base font-medium truncate" style={{ fontFamily: "Geist, sans-serif", color: "#4648d4", letterSpacing: "-0.02em" }}>
              Admin Panel
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#767586", letterSpacing: "0.05em", fontFamily: "Geist, sans-serif" }}>
              Manage your curation
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ icon, label, href }) => {
            const isActive = pathname === href;
            return isActive ? (
              <div
                key={label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold"
                style={{
                  backgroundColor: "#dae2fd",
                  color: "#0b1c30",
                  fontFamily: "Geist, sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {icon}
                </span>
                {label}
              </div>
            ) : (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:translate-x-1"
                style={{
                  color: "#767586",
                  fontFamily: "Geist, sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </div>

        {/* New Recommendation CTA (only visible if not already on add product page) */}
        {pathname !== "/dashboard/add-product" && (
          <Link
            href="/dashboard/add-product"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all active:scale-95"
            style={{
              backgroundColor: "#0b1c30",
              color: "#ffffff",
              fontFamily: "Geist, sans-serif",
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              add
            </span>
            New Recommendation
          </Link>
        )}

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.97] mt-auto cursor-pointer"
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
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Log Out
        </button>
      </nav>
    </>
  );
}
