import type { Metadata } from "next";
import { Geist, IBM_Plex_Mono, IBM_Plex_Sans, Inter_Tight } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const isPages = process.env.GITHUB_PAGES === "1";

export const metadata: Metadata = isPages
  ? { title: "404 Not Found" }
  : {
      title: "Stack — Funding that grows with your sales",
      description:
        "Working capital for noon sellers in the UAE, based on your sales. No applications, no fixed bill.",
    };

export default function RootLayout({ children }: LayoutProps<"/">) {
  if (isPages) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${interTight.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full overflow-x-hidden font-sans text-ink"
        style={{ background: "var(--bg)", color: "var(--ink)" }}
      >
        {children}
      </body>
    </html>
  );
}
