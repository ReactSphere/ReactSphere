import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true, // keep your React compiler option
  output: "export",    // tells Next.js to generate a static export
  // If you were deploying to a subpath like username.github.io/repo-name:
  // basePath: "/repo-name",
  // assetPrefix: "/repo-name/",
};

export default nextConfig;