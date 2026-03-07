import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export", // enable static export
  basePath: "",     // empty for username.github.io root
  assetPrefix: ".", // use relative paths for static files
};

export default nextConfig;