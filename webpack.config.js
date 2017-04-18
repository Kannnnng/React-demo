var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line

var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
  },
  // devtool: 'cheap-eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 7000,
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx$/,
        loaders: ['eslint-loader'],
        include: APP_PATH,
      },
      {
        test: /\.(js|jsx)$/i,
        loaders: ['babel-loader'],
        include: APP_PATH,
      },
      {
        test: /\.css$/i,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
        ],
        include: APP_PATH,
      },
      {
        test: /\.scss$/i,
        loaders: [
          'style-loader',
          'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[local]_[hash:base64:5]',
          'sass-loader',
        ],
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/i,
        loader: 'url-loader?limit=8192',
        include: APP_PATH,
      },
      {
        test: /\.(mp4|ogg|svg)$/i,
        loader: 'file-loader',
        include: APP_PATH,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
