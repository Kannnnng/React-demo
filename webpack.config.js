var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line
var HappyPack = require('happypack')  // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var AutoPrefixer = require('autoprefixer')  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line
var SplitByPathPlugin = require('webpack-split-by-path')  // eslint-disable-line
var CompressionPlugin = require('compression-webpack-plugin')  // eslint-disable-line
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin  // eslint-disable-line
var ExtractTextPlugin = require('extract-text-webpack-plugin')  // eslint-disable-line
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')  // eslint-disable-line

var entry = {}  // eslint-disable-line
var output = {}  // eslint-disable-line
var cache = null  // eslint-disable-line
var plugins = []  // eslint-disable-line
var devtool = null  // eslint-disable-line
var devServer = null  // eslint-disable-line

/* 如果当前环境是生产环境，就配置一些特定的插件，优化生产环境下的代码 */
if (process.env.NODE_ENV === 'production') {
  entry = {
    app: [
      'babel-polyfill',
      path.resolve(APP_PATH, 'index.js'),
    ],
  }
  output = {
    path: BUILD_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    /* 图片等文件的引用路径 */
    publicPath: '/React-demo/build/assets/',
  }
  cache = false
  devtool = null
  devServer = null
  plugins = [
    /* 去除重复的依赖包的代码，取而代之的是运行的时候请求一个封装函数 */
    /* 在 webpack2.0 中已不需要 */
    // new webpack.optimize.DedupePlugin(),
    /* 根据 id 的使用频率和分布来得出最短的 id 分配给使用频率高的模块 */
    /* 在 webpack2.0 中已经不需要特别声明 */
    // new webpack.optimize.OccurenceOrderPlugin(),
    /* 可以在编译时期创建全局变量 */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    /* 压缩 JS 文件， */
    new webpack.optimize.UglifyJsPlugin({
      /* 最紧凑的输出 */
      beautify: false,
      /* 删除所有的注释 */
      comments: false,
      /* 已经压缩过的文件不再次进行压缩 */
      exclude: /\.min\.js$/,
      compress: {
        /* 消除产生警告的代码，此类代码多来自于引用的模块内部 */
        warnings: false,
        // 删除所有的 `console` 语句，还可以兼容ie浏览器
        drop_console: true,
        /* 内嵌定义了但是只用到一次的变量 */
        collapse_vars: true,
        /* 提取出出现多次但是没有定义成变量去引用的静态值 */
        reduce_vars: true,
      },
      /* 去除注释 */
      output: { comments: false },
    }),
    /* 尽量合并代码 */
    new webpack.optimize.AggressiveMergingPlugin(),
    /* 允许错误不打断程序的执行，这在生产环境中很重要 */
    new webpack.NoEmitOnErrorsPlugin(),
    /* 按照路径的不同来分割代码，现在因为使用了 DLL 以后就不再需要这样做了 */
    // new SplitByPathPlugin([
    //   {
    //     name: 'vendor',
    //     path: path.join(__dirname, 'node_modules'),
    //   },
    // ]),
    /* 引入 DLL 文件 */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(BUILD_PATH, 'vendor.pro.manifest.json'),
    }),
    /* 将 CSS 代码单独抽离出来 */
    new ExtractTextPlugin('styles.css'),
    /* 打包时不再将整个 lodash 完全打包生成的文件中，而是仅将 lodash 中使用到的函数文件打包到生成文件中 */
    /* 相当于该插件代替开发人员手动筛选要引用的 lodash 中的文件 */
    new LodashModuleReplacementPlugin({
      paths: true,
    }),
    /* 通过多线程的方式快速编译代码 */
    new HappyPack({
      id: 'js',
      threads: 6,
      loaders: ['babel-loader?cacheDirectory'],
    }),
    /* 使用 Gzip 压缩 JS 文件和 CSS 文件 */
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]
} else {
  entry = {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(APP_PATH, 'index.js'),
    ],
    // vendors: [
    //   'react',
    //   'react-dom',
    //   'redux',
    //   'react-router',
    //   'material-ui',
    //   'lodash',
    //   'immutable',
    // ],
  }
  output = {
    path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  }
  cache = true
  /* 源代码与编译后代码的匹配模式 */
  /* 前者的第一次编译速度快于后者，但后者生成的 sourceMap 能够直接定位到源代码 */
  /* 而前者只能定位到编译后的代码 */
  // devtool = 'cheap-eval-source-map'
  devtool = 'cheap-module-eval-source-map'
  devServer = {
    headers: { 'X-Custom-Header': 'yes' },
    historyApiFallback: true,
    port: 9000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:7000',
        secure: false,
      },
    },
  }
  plugins = [
    /* 可以在编译时期创建全局变量 */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    /* 在组件热加载的时候显示更新的组件名而不是原本的组件 ID */
    new webpack.NamedModulesPlugin(),
    /* 以可视化的方式查看当前项目中引用的各个模块的大小 */
    // new BundleAnalyzerPlugin(),
    /* 抽取指定的公共代码库并将其打包到一个单独的文件中 */
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' }),  // 抽取公用块
    /* 引入 DLL 文件 */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(BUILD_PATH, 'vendor.dev.manifest.json'),
    }),
    /* 通过多线程的方式快速编译代码 */
    new HappyPack({
      id: 'js',
      threads: 6,
      loaders: ['babel-loader?cacheDirectory'],
    }),
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
  devtool,
  /* 开发工具 */
  devServer,
  /* 插件 */
  plugins,
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
        loaders: ['happypack/loader?id=js'],
        include: APP_PATH,
      },
      {
        test: /\.css$/i,
        loaders: (process.env.NODE_ENV === 'production' ?
          (
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[hash:5]',
                'postcss-loader',
              ].join('!'),
            })
          ) : (
            [  // eslint-disable-line
              'style-loader',  // eslint-disable-line
              'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[path][local]-[hash:5]',  // eslint-disable-line
              'postcss-loader',  // eslint-disable-line
            ]  // eslint-disable-line
          )
        ),
        include: APP_PATH,
      },
      {
        test: /\.scss$/i,
        loaders: (process.env.NODE_ENV === 'production' ?
          (
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[hash:5]',
                'postcss-loader',
                'sass-loader',
              ].join('!'),
            })
          ) : (
            [  // eslint-disable-line
              'style-loader',  // eslint-disable-line
              'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[path][local]-[hash:5]',  // eslint-disable-line
              'postcss-loader',  // eslint-disable-line
              'sass-loader',  // eslint-disable-line
            ]  // eslint-disable-line
          )
        ),
        include: APP_PATH,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'url-loader?limit=4096',
        include: APP_PATH,
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        loader: 'url-loader?limit=4096',
        include: APP_PATH,
      },
      {
        test: /\.(mp4|ogg|mp3|svg)$/i,
        loader: 'file-loader',
        include: APP_PATH,
      },
    ],
  },
  resolve: {
    /* 可能用到的文件扩展名 */
    extensions: ['.js', '.scss', '.jsx', '.css'],
    /* 文件路径别名，方便在写代码时对模块的引用 */
    alias: {
      app: APP_PATH,
      components: path.resolve(APP_PATH, 'components'),
      containers: path.resolve(APP_PATH, 'containers'),
      images: path.resolve(APP_PATH, 'images'),
      utils: path.resolve(APP_PATH, 'utils'),
    },
    /* 打包文件时优先使用 ES2015 的代码 */
    mainFields: ['jsnext:main', 'main'],
    /* 直接写明 node_modules 的全路径 */
    modules: [path.resolve(ROOT_PATH, 'node_modules')],
  },
}
