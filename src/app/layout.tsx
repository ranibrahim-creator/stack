import type { Metadata } from "next";
import { Geist, Inter_Tight } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stack — Funding that grows with your sales",
  description:
    "Working capital for noon sellers in the UAE, based on your sales. No applications, no fixed bill.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${interTight.variable} h-full antialiased`}
    >
      <body
        className="min-h-full font-sans text-ink"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        {children}
      </body>
    </html>
  );
}
