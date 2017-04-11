var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line

var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'index.jsx'),
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  // devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
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
        test: /\.jsx$/,
        loaders: ['babel-loader'],
        include: APP_PATH,
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'sass-loader', 'css-loader'],
        include: APP_PATH,
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'jsx'],
  },
}
