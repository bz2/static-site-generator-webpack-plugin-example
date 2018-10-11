var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ss = require('./src/ss_routes');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    contentBase: __dirname + '/build',
    inline: false,
    hot: true,
  },

  entry: './src/index',
  output: {
    path: __dirname + 'build',
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: __dirname + '/src',
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
        include: __dirname + '/src'
      },
      {
        test: /\.(jpg|png)/,
        loader: 'file-loader?name=assets/img-[hash:6].[ext]',
        include: __dirname + '/src'
      },
      {
        test: /\.(ico|otf|pdf)/,
        loader: 'file-loader?name=[name].[ext]',
        include: __dirname + '/src/'
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new StaticSiteGeneratorPlugin({
      entry: 'main',
      paths: ss.routes,
      globals: {
        window: { addEventListener: () => {} },
      },
    }),
  ]
};
