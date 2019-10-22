const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
    entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader' 
        ]
      },
      {
        test: /\.less$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'src/index.html',
    //   inject: 'body',
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //   },
    // }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[hash].css',
    //   chunkFilename: 'css/[id].[hash].css',
    // }),
  ]
});