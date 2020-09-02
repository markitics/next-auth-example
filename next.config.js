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

    // https://stackoverflow.com/a/55180310/870121
    // https://blog.logrocket.com/how-to-use-svgs-in-react/#:~:text=Using%20SVG%20as%20a%20component,%7D%20from%20'.%2Flogo.
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
