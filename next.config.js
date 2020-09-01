module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    // So we can use logic in views as well as in api (server-side)
    // From https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
