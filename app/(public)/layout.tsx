import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ArdhiSoko — Kenya's Trusted Land Marketplace",
  description:
    "Premium land and property investments in Kenya. Malindi coastal plots, Konza Technopolis plots, and Kamakis apartments.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${dmSans.variable} font-body bg-white text-[#1A1A1A] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
