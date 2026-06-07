"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import React from "react";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#0b1c30",
            border: "1px solid rgba(199, 196, 215, 0.5)",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "Geist, system-ui, sans-serif",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.06)",
          },
          success: {
            iconTheme: { primary: "#4648d4", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#ba1a1a", secondary: "#ffffff" },
          },
        }}
      />
      {children}
    </SessionProvider>
  );
}
