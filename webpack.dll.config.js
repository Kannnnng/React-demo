var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line
var CompressionPlugin = require('compression-webpack-plugin')  // eslint-disable-line

var output = undefined  // eslint-disable-line
var plugins = undefined  // eslint-disable-line

if (process.env.NODE_ENV === 'production') {
  output = {
    path: BUILD_PATH,
    filename: '[name].[hash].pro.dll.js',
    library: '[name]_library',
  }
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
    /* 打包公共代码库为一个 DLL 文件 */
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, '[name].pro.manifest.json'),
      name: '[name]_library',
      context: __dirname,
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
  output = {
    path: BUILD_PATH,
    filename: '[name].[hash].dev.dll.js',
    library: '[name]_library',
  }
  plugins = [
    /* 打包公共代码库为一个 DLL 文件 */
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, '[name].dev.manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
  ]
}

const vendors = [
  'axios',
  'immutable',
  /* lodash 可以通过 lodash-webpack-plugin 这款插件实现精确引用，防止将整个 lodash */
  /* 全部打包到最后的文件中 */
  // 'lodash',
  /* 不在此处统一引用，使用 import Button from 'material-ui/Button' 这样的引用语法 */
  /* 可以避免将整个 material-ui 全部打包到最后的文件中 */
  // 'material-ui',
  /* md5 这个库在代码中暂时没用到 */
  // 'md5',
  'moment',
  'normalizr',
  'prop-types',
  'react',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-loadable',
  'react-redux',
  'react-router-dom',
  'react-router-redux',
  'react-tap-event-plugin',
  'redux',
  'redux-actions',
  'reselect',
]

/* 处于生产环境时，由于 lodash-webpack-plugin 插件的使用，将会仅把代码中用到的 lodash 中 */
/* 的每一个小部分打包到最后的输出文件中，这样最后的输出文件中就只存在使用到的 lodash 中的函 */
/* 数，减少文件体积，但是在开发过程中，没有使用上面那个插件，因此还是需要将 lodash 整个打包 */
/* 到 DLL 文件中 */
if (process.env.NODE_ENV !== 'production') {
  vendors.push('lodash')
}

module.exports = {
  entry: {
    vendor: vendors,
  },
  output,
  plugins,
  resolve: {
    /* 直接写明 node_modules 的全路径 */
    modules: [path.resolve(ROOT_PATH, 'node_modules')],
  },
}
