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
            background: "#FAF8F4",
            color: "#151515",
            border: "1px solid rgba(229, 225, 218, 0.5)",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "Geist, system-ui, sans-serif",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.06)",
          },
          success: {
            iconTheme: { primary: "#7c6853", secondary: "#FAF8F4" },
          },
          error: {
            iconTheme: { primary: "#ba1a1a", secondary: "#FAF8F4" },
          },
        }}
      />
      {children}
    </SessionProvider>
  );
}
