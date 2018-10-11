var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var ss = require('./src/ss_routes');

module.exports = {
  mode: 'production',
  devtool: false,

  entry: './src/index',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({ browsers: ['last 2 versions'] }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)/,
        loader: 'file-loader',
        options: {
          name: 'img-[hash:6].[ext]',
          outputPath: 'assets/',
          publicPath: '/assets/',
        },
      },
      {
        test: /\.(ico|otf|pdf)/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new StaticSiteGeneratorPlugin({
      entry: 'main',
      paths: ss.routes,
      locals: ss,
      globals: {
        window: { addEventListener: () => {} },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') },
    }),
  ]
};
