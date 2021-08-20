const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');
const { getPkgDir } = require('./paths');
const { shouldOpenAnalyzer, ANALYZER_HOST, ANALYZER_PORT } = require('./conf');
const { error } = require('./helper');

const { name } = argv;

if (!name) {
  error('Error: project not specified');
}

module.exports = () => {
  const curPkgDir = getPkgDir(name);

  const prodConfig = {
    mode: 'production',
    devtool: 'source-map',
    entry: path.resolve(curPkgDir, 'src', 'index.ts'),
    output: {
      filename: 'index.min.js',
      path: path.resolve(curPkgDir, 'dist', 'umd'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.BannerPlugin({
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
      ],
    },
  };

  return merge(common(argv), prodConfig);
};
