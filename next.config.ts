/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "aniworld.to",
      },
      {
        protocol: "https",
        hostname: "s.to",
      },
    ],
  },
};
