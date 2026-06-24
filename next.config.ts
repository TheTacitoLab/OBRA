import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site builds to /out as plain HTML/CSS/JS.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for `output: 'export'` — no on-demand image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
