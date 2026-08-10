import type { Metadata } from "next";
import { Imbue, Victor_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/shared/SmoothScroller";

const imbue = Imbue({
  variable: "--font-imbue",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const victorMono = Victor_Mono({
  variable: "--font-victor-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Goaframe - Builder ID Card Generator",
  description: "HH Goa 2026 Builder ID Card Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${imbue.variable} ${victorMono.variable}`}>
      <body className="bg-teal-deep text-warm-white font-sans antialiased overflow-x-hidden">
        <SmoothScroller />
        {children}
      </body>
    </html>
  );
}
