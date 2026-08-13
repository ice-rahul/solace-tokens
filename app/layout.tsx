import type { Metadata } from "next";
import "./globals.css";

import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["400","500","600"], style: ["normal","italic"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", weight: ["400","500","600"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400","500"] });

export const metadata: Metadata = {
  title: "Solace — Tokens",
  description: "A live design-token system: color, type, and accessibility, derived from a single seed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
