import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = "https://ranibrahim-creator.github.io/stack";
const title = "Financing built into commerce. - Stack";
const description =
  "Working capital for noon sellers in the UAE, based on your sales.";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Stack",
    type: "website",
    locale: "en_AE",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${plexMono.variable} h-full antialiased`}
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
