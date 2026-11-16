import type { NextConfig } from "next";

// The browser always calls the API on the same origin under /api.
// On Vercel, the top-level rewrite in vercel.json sends /api/* to the FastAPI service before Next.js sees it.
// In plain `npm run dev`, this rewrite forwards /api/* to a local uvicorn (override with SARPULSE_API_ORIGIN).
const localApi = process.env.SARPULSE_API_ORIGIN ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  // The image optimizer route (/_next/image) is not served in this multi-service deployment, so images are
  // served as-is from public/ (the landing screenshots are already compressed JPEGs).
  images: { unoptimized: true },
  async rewrites() {
    if (process.env.VERCEL) return [];
    return [{ source: "/api/:path*", destination: `${localApi}/api/:path*` }];
  },
};

export default nextConfig;
