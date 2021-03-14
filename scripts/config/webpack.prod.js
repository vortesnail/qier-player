const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const paths = require('../paths.js');
const common = require('./webpack.common.js');
const { dashToBigCamel } = require('../utils');
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('../constants');

const pkg = require(paths.appPackageJson);

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  target: 'browserslist',
  entry: paths.appIndex,
  output: {
    filename: `${pkg.name}.min.js`,
    path: paths.appDistUmd,
    library: dashToBigCamel(pkg.name, '-'),
    libraryTarget: 'umd',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset/inline',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new Webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by qier-player (https://github.com/vortesnail/qier-player) */',
    }),
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        },
      }),
      new CssMinimizerPlugin(),
    ].filter(Boolean),
  },
});
