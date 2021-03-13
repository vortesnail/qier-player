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
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appDemoHtml,
      cache: false,
      minify: false,
    }),
  ],
});
