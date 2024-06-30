/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({
          name: "msw/browser",
          alias: false,
        });
      } else {
        config.resolve.alias["msw/browser"] = false;
      }
    }
    return config;
  },
};

module.exports = nextConfig;
