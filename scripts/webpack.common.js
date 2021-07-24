const path = require('path');
const { isDevelopment, isProduction } = require('./env');

const getCssLoaders = (importLoaders) => [
  isDevelopment ? 'style-loader' : 'style-loader',
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

module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  output: {
    library: {
      name: 'QierPlayer',
      type: 'umd',
      umdNamedDefine: true,
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@Src': path.resolve(__dirname, '../packages/qier-player/src'),
    },
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
          {
            loader: 'ts-loader',
            options: { configFile: path.resolve(__dirname, '../packages/qier-player/', 'tsconfig.json') },
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
};
