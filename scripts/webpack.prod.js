const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../packages/qier-player/src/index.ts'),
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, '../packages/qier-player/dist'),
  },
  plugins: [new CleanWebpackPlugin()].filter(Boolean),
});
