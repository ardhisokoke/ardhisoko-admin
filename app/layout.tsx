import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "ArdhiSoko Admin",
  description: "ArdhiSoko Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} font-opensans bg-gray-100 text-[#1A1A1A]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
