/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Real product/portfolio photos will be served from Supabase Storage later;
    // add the bucket host here when wiring the backend, e.g.:
    // remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
