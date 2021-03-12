const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  target: 'web',
  entry: paths.appDemoIndex,
  output: {
    filename: 'js/[name].js',
    path: paths.appDist,
  },
  devServer: {
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    open: true,
    hot: true,
    noInfo: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appDemoHtml,
      cache: false,
      minify: false,
    }),
  ],
});
