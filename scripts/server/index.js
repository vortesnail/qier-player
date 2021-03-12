const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../config/webpack.dev');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const logger = require('./logger');

const compiler = Webpack(webpackDevConfig);

const devServerOptions = {
  ...webpackDevConfig.devServer,
};
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(SERVER_PORT, SERVER_HOST, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  return logger.start(SERVER_PORT, SERVER_HOST);
});
