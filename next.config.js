/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "pbs.twimg.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "logos-world.net",
      },
    ],
  },
};

module.exports = nextConfig;
