import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export" as const,
        basePath: "/stack",
        assetPrefix: "/stack",
      }
    : {}),
  images: { unoptimized: true },
};

export default nextConfig;
