const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const common = require('./webpack.common');
const { getPkgDir, getFixturesDir } = require('./paths');
const { error } = require('./helper');

const { target } = argv;

if (!target) {
  error('Error: project not specified');
}

module.exports = () => {
  const curPkgDir = getPkgDir(target);
  const pkgDir = getPkgDir();
  const curFixtureDir = getFixturesDir(target);
  const fixturesDir = getFixturesDir();

  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    target: ['web', 'es5'],
    entry: ['webpack-dev-server/client', path.resolve(curPkgDir, 'src', 'index.ts')],
    devServer: {
      contentBase: [fixturesDir, pkgDir],
      compress: true,
      stats: 'errors-only',
      clientLogLevel: 'silent',
      open: true,
      noInfo: true,
      watchContentBase: true,
      liveReload: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(curFixtureDir, 'index.html'),
        cache: true,
      }),
    ],
  };

  return merge(common(argv), devConfig);
};
