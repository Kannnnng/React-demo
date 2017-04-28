var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line

var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line

module.exports = {
  entry: {
    babel: 'babel-polyfill',
    app: path.resolve(APP_PATH, 'index.js'),
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  // devtool: 'cheap-eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 9000,
    noInfo: false,
    proxy: {
      '/api/*': {
        target: 'http://localhost:7000',
        secure: false,
      },
    },
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.jsx$/i,
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
          'css-loader?sourceMap',
        ],
        include: APP_PATH,
      },
      {
        test: /\.scss$/i,
        loaders: [
          'style-loader',
          'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[local]_[hash:5]',
          'sass-loader',
        ],
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'url-loader?limit=8192',
        include: APP_PATH,
      },
      {
        test: /\.(svg|ttf|woff|woff2)$/i,
        loader: 'url-loader?limit=8192',
      },
      {
        test: /\.(mp4|ogg|mp3)$/i,
        loader: 'file-loader',
        include: APP_PATH,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css', 'scss'],
    alias: {
      actions: path.resolve(APP_PATH, 'actions'),
      components: path.resolve(APP_PATH, 'components'),
      containers: path.resolve(APP_PATH, 'containers'),
      images: path.resolve(APP_PATH, 'images'),
      reducers: path.resolve(APP_PATH, 'reducers'),
      store: path.resolve(APP_PATH, 'store'),
    },
  },
}
