const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {

  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: ['.js', '.jsx', 'css', 'scss', 'json'],
    modules: [path.resolve(paths.appSrc), 'node_modules'],
  },
  output: {
    path: path.resolve(paths.appPublic),
    publicPath: '/public/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /__tests__/],
        include: path.resolve(paths.appSrc),
        use: ['babel-loader']
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },

      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        include: [path.resolve(paths.appSrc)],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new LoadablePlugin({writeToDisk: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        BROWSER: JSON.stringify(true)
      }
    }),
    new MiniCssExtractPlugin({
      // filename: "[chunkhash]_[name].css",
      filename: '[name].css',
    })
  ],

};

