var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line
var HappyPack = require('happypack')  // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line
var NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules')  // eslint-disable-line
var CleanWebpackPlugin = require('clean-webpack-plugin')  // eslint-disable-line
var ExtractTextPlugin = require('extract-text-webpack-plugin')  // eslint-disable-line
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')  // eslint-disable-line
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')  // eslint-disable-line
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin  // eslint-disable-line

var entry = {}  // eslint-disable-line
var output = {}  // eslint-disable-line
var cache = true  // eslint-disable-line
var plugins = []  // eslint-disable-line
var devtool = false  // eslint-disable-line
var devServer = {}  // eslint-disable-line

/* 获取启动命令中的当前环境设置 */
var envIndex = process.argv.indexOf('--env')  // eslint-disable-line
var env = envIndex !== -1 ? process.argv[envIndex + 1] : undefined  // eslint-disable-line

/* 根据启动命令中的环境设置改变 NODE_ENV 的值 */
process.env.NODE_ENV = env === 'pro' ? 'production' : 'development'

/* 如果当前环境是生产环境，就配置一些特定的插件，优化生产环境下的代码 */
if (process.env.NODE_ENV === 'production') {
  entry = {
    app: [
      // 'babel-polyfill',
      path.resolve(APP_PATH, 'index.js'),
    ],
  }
  output = {
    path: BUILD_PATH,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    /* 图片等文件的引用路径 */
    publicPath: '/React-demo/build/',
  }
  cache = false
  devtool = 'source-map'
  devServer = {}
  plugins = [
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
    /* 引入 DLL 文件 */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(BUILD_PATH, 'vendor.pro.manifest.json'),
    }),
    /* 将 CSS 代码单独抽离出来 */
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'styles.[hash].css',
    }),
    /* 与 extract-text-webpack-plugin 协同工作，压缩 CSS 代码 */
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
    /* 打包时不再将整个 lodash 完全打包生成的文件中，而是仅将 lodash 中使用到的函数文件打包到生成文件中 */
    /* 相当于该插件代替开发人员手动筛选要引用的 lodash 中的文件 */
    new LodashModuleReplacementPlugin({
      paths: true,
      flattening: true,
    }),
    /* 通过多线程的方式快速编译代码 */
    new HappyPack({
      id: 'js',
      threads: 2,
      loaders: ['babel-loader'],
    }),
    /* 每次编译生产环境代码时先将之前的文件删除掉 */
    new CleanWebpackPlugin(
      [
        'build/app.*.js',
        'build/*.chunk.js',
        'build/styles.*.css',
        'build/styles.*.css.map',
      ],
      {
        verbose: true,
        dry: false,
      }
    ),
    /* 开启作用域提升功能 */
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
} else {
  entry = {
    app: [
      // 'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(APP_PATH, 'index.js'),
    ],
  }
  output = {
    path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  }
  cache = true
  /* 源代码与编译后代码的匹配模式 */
  /* Hot reloading code is just one line in the beginning and one line in the */
  /* end of each module so you might not need source maps at all */
  // devtool = 'eval'
  /* 前者的第一次编译速度快于后者，但后者生成的 sourceMap 能够直接定位到源代码 */
  /* 而前者只能定位到编译后的代码 */
  devtool = 'inline-source-map'
  // devtool = 'cheap-eval-source-map'
  // devtool = 'cheap-module-eval-source-map'
  devServer = {
    /* 暂时使用不到这个设置 */
    // headers: { 'X-Custom-Header': 'yes' },
    /* 设置为 true 后所有的跳转都将指向 index.html */
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    inline: true,
    port: 9000,
    /* 请求代理 */
    proxy: {
      '/api/*': {
        target: 'http://localhost:7000',
        secure: false,
      },
    },
    publicPath: '/',
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
    /* 引入 DLL 文件 */
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(BUILD_PATH, 'vendor.dev.manifest.json'),
    }),
    /* 通过多线程的方式快速编译代码 */
    // new HappyPack({
    //   id: 'js',
    //   threads: 2,
    //   loaders: ['babel-loader?cacheDirectory'],
    // }),
    /* 开启作用域提升功能 */
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
}

module.exports = {
  context: __dirname,
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
      /* 暂时先把 Eslint 关掉，这玩意太蛋疼了 */
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/i,
      //   loaders: ['eslint-loader'],
      //   exclude: NODE_MODULES_PATH,
      // },
      {
        test: /\.(js|jsx)$/i,
        loaders: (process.env.NODE_ENV === 'production' ? ['happypack/loader?id=js'] : ['react-hot-loader/webpack', 'babel-loader?cacheDirectory']),  // eslint-disable-line
        exclude: NODE_MODULES_PATH,
      },
      {
        test: /\.css$/i,
        loaders: (process.env.NODE_ENV === 'production' ?
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[hash:5]',
                'postcss-loader',
              ],
            })
          :
            [  // eslint-disable-line
              'style-loader',  // eslint-disable-line
              'css-loader?camelCase&modules&sourceMap&importLoaders=1&localIdentName=[path][local]-[hash:5]',  // eslint-disable-line
              'postcss-loader',  // eslint-disable-line
            ]  // eslint-disable-line
        ),
        exclude: NODE_MODULES_PATH,
      },
      {
        test: /\.scss$/i,
        loaders: (process.env.NODE_ENV === 'production' ?
          (
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?camelCase&modules&sourceMap&importLoaders=2&localIdentName=[hash:5]',
                'postcss-loader',
                'sass-loader',
              ],
            })
          ) : (
            [  // eslint-disable-line
              'style-loader',  // eslint-disable-line
              'css-loader?camelCase&modules&sourceMap&importLoaders=2&localIdentName=[path][local]-[hash:5]',  // eslint-disable-line
              'postcss-loader',  // eslint-disable-line
              'sass-loader',  // eslint-disable-line
            ]  // eslint-disable-line
          )
        ),
        exclude: NODE_MODULES_PATH,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'url-loader?limit=4096&name=assets/[hash].[ext]',
        exclude: NODE_MODULES_PATH,
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        loader: 'url-loader?limit=4096',
        exclude: NODE_MODULES_PATH,
      },
      {
        test: /\.(mp4|ogg|mp3)$/i,
        loader: 'file-loader',
        exclude: NODE_MODULES_PATH,
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
    /* 直接写明 node_modules 的全路径 */
    modules: [NODE_MODULES_PATH],
  },
}
