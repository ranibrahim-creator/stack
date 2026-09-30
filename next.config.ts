import type { NextConfig } from "next";

const staticBase =
  process.env.STATIC_BASE ??
  (process.env.GITHUB_PAGES === "1" ? "/stack" : "");
const isExport =
  process.env.GITHUB_PAGES === "1" || process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export" as const,
        ...(staticBase
          ? { basePath: staticBase, assetPrefix: staticBase }
          : {}),
      }
    : {}),
  images: { unoptimized: true },
};

export default nextConfig;
