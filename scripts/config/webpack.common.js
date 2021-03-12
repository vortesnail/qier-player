const WebpackBar = require('webpackbar');
const { isDevelopment } = require('../env');

module.exports = {
  cache: {
    type: 'filesystem',
  },
  plugins: [
    new WebpackBar({
      name: isDevelopment ? 'RUNNING' : 'BUNDLING',
    }),
  ],
};
