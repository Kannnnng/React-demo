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
  devtool: 'cheap-eval-source-map',
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
        loaders: [
          'style-loader',
          'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[local]_[hash:base64:5]',
          'sass-loader',
        ],
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192',
        include: APP_PATH,
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader',
        include: APP_PATH,
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'jsx'],
  },
}
