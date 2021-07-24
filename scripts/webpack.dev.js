const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: ['web', 'es5'],
  entry: path.resolve(__dirname, '../packages/qier-player/src/index.ts'),
  devServer: {
    contentBase: [path.resolve(__dirname, '..', 'fixtures'), path.resolve(__dirname, '..', 'packages')],
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    open: true,
    noInfo: true,
    watchContentBase: true,
    liveReload: true,
    host: 'localhost',
    port: '8881',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../fixtures/qier-player/index.html'),
      cache: true,
    }),
  ],
});
