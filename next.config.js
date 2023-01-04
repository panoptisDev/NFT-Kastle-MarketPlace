/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
    //domains: ["ipfs.infura.io", "nft-kastle.infura-ipfs.io"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors
    ignoreDuringBuilds: true,
  },
};
