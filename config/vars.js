var dotenv = require('dotenv')
dotenv.config()

module.exports = {
  mongo: {
    uri: process.env.ENVIRONMENT === 'development' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI_PROD,
  },
  env: process.env.ENVIRONMENT,
  jwtSecret: process.env.JWT_SECRET,
  appTitle: process.env.APP_TITLE
};
