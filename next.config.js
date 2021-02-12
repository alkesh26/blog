module.exports = {
  env: {
    BASE_PATH: process.env.BASE_PATH,
    GA_CODE: process.env.GA_CODE,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/generateSiteMap')
    }
    return config
  }
};
