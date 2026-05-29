import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Supabase Storage and Cloudinary (Phase 2)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "flagcdn.com" },          // Country flags — free, MIT
      { protocol: "https", hostname: "*.supabase.co" },        // Phase 2: fan uploads
      { protocol: "https", hostname: "res.cloudinary.com" },   // Phase 2: image CDN
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",         value: "DENY" },
          { key: "X-Content-Type-Options",   value: "nosniff" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
