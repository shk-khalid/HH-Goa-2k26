import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
