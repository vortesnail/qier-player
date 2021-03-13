const { merge } = require('webpack-merge');
const paths = require('../paths.js');
const common = require('./webpack.common.js');
const { dashToBigCamel } = require('../utils');

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
});
