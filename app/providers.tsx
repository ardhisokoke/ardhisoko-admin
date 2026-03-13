"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "var(--font-montserrat)",
            fontSize: "0.78rem",
            fontWeight: 600,
            background: "#1A1A1A",
            color: "#fff",
          },
          success: { style: { background: "#43A047" } },
          error: { style: { background: "#E53935" } },
        }}
      />
    </SessionProvider>
  );
}
