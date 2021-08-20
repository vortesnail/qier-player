const path = require('path');
const WebpackBar = require('webpackbar');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { isDevelopment, isProduction } = require('./env');
const { getPkgDir } = require('./paths');

const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDevelopment,
      postcssOptions: {
        plugins: isProduction
          ? [
              require('postcss-preset-env'),
              require('autoprefixer'),
              require('cssnano')({
                preset: [
                  'default',
                  {
                    discardComments: {
                      removeAll: true,
                    },
                  },
                ],
              }),
            ]
          : [],
      },
    },
  },
];

const getUmdName = (target) => {
  return target.replace(/^qier-player/i, 'QierPlayer').replace(/-([A-Za-z])/g, (_, c) => c.toUpperCase());
};

module.exports = (argv) => {
  const curPkgDir = getPkgDir(argv.target || argv.name);
  const pkg = require(path.resolve(curPkgDir, 'package.json'));

  const commonConfig = {
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    output: {
      library: {
        name: getUmdName(argv.target || argv.name),
        type: 'umd',
        umdNamedDefine: true,
      },
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '@Src': path.resolve(curPkgDir, 'src'),
      },
    },
    externals: {
      react: 'React',
      vue: 'Vue',
      'qier-player': 'QierPlayer',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: getCssLoaders(1),
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            ...getCssLoaders(2),
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebpackBar({
        name: isDevelopment ? 'RUNNING' : 'BUNDLING',
        color: isDevelopment ? '#52c41a' : '#722ed1',
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(curPkgDir, 'tsconfig.json'),
        },
      }),
    ],
  };

  if (pkg.umdDefault) commonConfig.output.library.export = 'default';

  return commonConfig;
};
