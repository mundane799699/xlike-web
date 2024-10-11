/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ],
  },
};

module.exports = nextConfig;
