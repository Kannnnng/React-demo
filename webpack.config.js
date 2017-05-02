var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line
var SplitByPathPlugin = require('webpack-split-by-path')  // eslint-disable-line

var entry = {}  // eslint-disable-line
var output = {}  // eslint-disable-line
var cache = undefined  // eslint-disable-line
var plugins = []  // eslint-disable-line

/* 如果当前环境是生产环境，就配置一些特定的插件，优化生产环境下的代码 */
if (process.argv[process.argv.length - 1].slice(6, 9) === 'pro') {
  entry = {
    app: ['babel-polyfill', path.resolve(APP_PATH, 'index.js')],
  }
  output = {
    path: BUILD_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  }
  cache = false
  plugins = [
    /* 去除重复的依赖包的代码，取而代之的是运行的时候请求一个封装函数 */
    /* 在 webpack2.0 中已不需要 */
    // new webpack.optimize.DedupePlugin(),
    /* 根据 id 的使用频率和分布来得出最短的 id 分配给使用频率高的模块 */
    /* 在 webpack2.0 中已经不需要特别声明 */
    // new webpack.optimize.OccurenceOrderPlugin(),
    /* 声明此时的环境是生产环境，这样能够避免开发环境中的一些错误或警告显示代码被打包到文件中 */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    /* 压缩 JS 文件， */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        /* 消除产生警告的代码，此类代码多来自于引用的模块内部 */
        warnings: false,
      },
    }),
    /* 尽量合并代码 */
    new webpack.optimize.AggressiveMergingPlugin(),
    /* 允许错误不打断程序的执行，这在生产环境中很重要 */
    new webpack.NoEmitOnErrorsPlugin(),
    /* 按照路径的不同来分割代码 */
    new SplitByPathPlugin([
      {
        name: 'vendor',
        path: path.join(__dirname, 'node_modules'),
      },
    ], {
      manifest: 'app-entry',
    }),
  ]
} else {
  entry = {
    webpack: 'webpack/hot/only-dev-server',
    babel: 'babel-polyfill',
    app: path.resolve(APP_PATH, 'index.js'),
  }
  output = {
    path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[name].js',
  }
  cache = true
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = {
  /* 入口文件 */
  entry,
  /* 出口文件 */
  output,
  /* 设置缓存是否开启，当前设置是在开发环境下缓存开启 */
  cache,
  /* 源代码与编译后代码的匹配模式 */
  // devtool: 'cheap-eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: 9000,
    noInfo: false,
    proxy: {
      '/api/*': {
        target: 'http://localhost:7000',
        secure: false,
      },
    },
  },
  /* 针对不同的文件类型配置不同的 loader，并设置对应的配置项 */
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
    /* 可能用到的文件扩展名 */
    extensions: ['.js', '.jsx', 'css', 'scss'],
    /* 文件路径别名，方便在写代码时对模块的引用 */
    alias: {
      actions: path.resolve(APP_PATH, 'actions'),
      components: path.resolve(APP_PATH, 'components'),
      containers: path.resolve(APP_PATH, 'containers'),
      images: path.resolve(APP_PATH, 'images'),
      reducers: path.resolve(APP_PATH, 'reducers'),
      sources: path.resolve(APP_PATH, 'sources'),
      store: path.resolve(APP_PATH, 'store'),
      utils: path.resolve(APP_PATH, 'utils'),
    },
  },
  plugins,
}
