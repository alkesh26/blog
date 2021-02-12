module.exports = {
  env: {
    BASE_PATH: process.env.BASE_PATH,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/generateSiteMap')
    }
    return config
  }
};
