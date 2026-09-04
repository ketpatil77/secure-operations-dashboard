import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/secure-operations-dashboard",
  assetPrefix: "/secure-operations-dashboard/",
  images: { unoptimized: true },
  reactCompiler: true,
};

export default nextConfig;
