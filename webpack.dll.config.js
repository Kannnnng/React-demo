var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line
var HtmlWebpackPlugin = require('html-webpack-plugin')  // eslint-disable-line
var CleanWebpackPlugin = require('clean-webpack-plugin')  // eslint-disable-line
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin  // eslint-disable-line

var output = undefined  // eslint-disable-line
var plugins = undefined  // eslint-disable-line

/* 获取启动命令中的当前环境设置 */
var envIndex = process.argv.indexOf('--env')  // eslint-disable-line
var env = envIndex !== -1 ? process.argv[envIndex + 1] : undefined  // eslint-disable-line

/* 根据启动命令中的环境设置改变 NODE_ENV 的值 */
process.env.NODE_ENV = env === 'pro' ? 'production' : 'development'

if (process.env.NODE_ENV === 'production') {
  output = {
    path: path.resolve(BUILD_PATH, 'proDll'),
    filename: '[name].[hash].pro.dll.js',
    library: '[name]_library',
  }
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
    /* 打包公共代码库为一个 DLL 文件 */
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, 'proDll/[name].pro.manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
    /* 每次编译生产环境代码时先将之前的文件删除掉 */
    new CleanWebpackPlugin(
      [
        'build/proDll/vendor.*.pro.dll.js',
        'build/proDll/vendor.pro.manifest.json',
      ],
      {
        /* 将删除操作产生的信息打印到控制台上 */
        verbose: true,
        /* 如果设置为 true，则仅仅显示符合删除条件的文件列表，也就是说哪些文件将要被删除，但 */
        /* 实际上不会执行删除操作 */
        dry: false,
      }
    ),
    /* 开启作用域提升功能 */
    new webpack.optimize.ModuleConcatenationPlugin(),
    /* 加入通过模板自动生成 HTML 文件功能 */
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'utils/appprotemplate.ejs'),
      filename: path.resolve(BUILD_PATH, 'index.ejs'),
      inject: false,
      title: 'React-demo',
      minify: false,
    }),
    /* 禁止打包匹配文件 */
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    /* 以可视化的方式查看当前项目中引用的各个模块的大小 */
    new BundleAnalyzerPlugin(),
  ]
} else {
  output = {
    path: path.resolve(BUILD_PATH, 'devDll'),
    filename: '[name].[hash].dev.dll.js',
    library: '[name]_library',
  }
  plugins = [
    /* 打包公共代码库为一个 DLL 文件 */
    new webpack.DllPlugin({
      path: path.resolve(BUILD_PATH, 'devDll/[name].dev.manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
    /* 每次编译生产环境代码时先将之前的文件删除掉 */
    new CleanWebpackPlugin(
      [
        'build/devDll/vendor.*.dev.dll.js',
        'build/devDll/vendor.dev.manifest.json',
      ],
      {
        verbose: true,
        dry: false,
      }
    ),
    /* 开启作用域提升功能 */
    /* 在开发环境中开启这个功能，我自己感觉会导致与 react-hot-loader 有冲突，总是会发生一些 */
    /* 问题，所以现在只在生产环境中开启这个功能 */
    // new webpack.optimize.ModuleConcatenationPlugin(),
    /* 加入通过模板自动生成 HTML 文件功能 */
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'utils/apptemplate.ejs'),
      filename: path.resolve(ROOT_PATH, 'index.html'),
      inject: false,
      title: 'React-demo',
      minify: false,
    }),
    /* 禁止打包匹配文件 */
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.IgnorePlugin(/^\.\/cjs\/react\.production\.min\.js$/, /react$/),
    new webpack.IgnorePlugin(/^\.\/cjs\/react-dom\.production\.min\.js$/, /react-dom$/),
    /* 以可视化的方式查看当前项目中引用的各个模块的大小 */
    // new BundleAnalyzerPlugin(),
  ]
}

const vendors = [
  'axios',
  'immutable',
  /* 不需要将 jquery 整个打包到 DLL 文件中 */
  // 'jquery',
  /* lodash-es 可以通过 lodash-webpack-plugin 这款插件实现精确引用，防止将整个 lodash-es */
  /* 全部打包到最后的文件中 */
  // 'lodash-es',
  /* 不在此处统一引用，使用 import Button from 'material-ui/Button' 这样的引用语法 */
  /* 可以避免将整个 material-ui 全部打包到最后的文件中 */
  // 'material-ui',
  /* md5 这个库在代码中暂时没用到 */
  // 'md5',
  /* moment 现在已经使用 ES6 重新编写了，所以可以按需加载 */
  // 'moment',
  'normalizr',
  'react',
  /* 实现拖拽效果的两个库，在目前的项目中可以暂时不使用 */
  // 'react-dnd',
  // 'react-dnd-html5-backend',
  'react-dom',
  /* 莫名其妙地，将这两个包添加到 DLL 中热替换就失败了 */
  // 'react-hot-component-loader',
  // 'react-hot-loader',
  'react-loadable',
  // 'react-redux',
  // 'react-router-dom',
  'react-tap-event-plugin',
  // 'redux',
  // 'redux-actions',
  /* 不在此处统一引用，因为这个工具库还是有点大，使用 ES6 模块化引用可以防止不必要的代码被 */
  /* 打包进去 */
  // 'redux-form',
  'redux-immutable',
  'redux-promise',
  'reselect',

]

/* 处于开发环境时将 jQuery 也打包到 DLL 文件中 */
/* 处于开发环境时将 Moment 也打包到 DLL 文件中 */
/* 处于开发环境时将 Mockjs 也打包到 DLL 文件中 */
/* 处于开发环境时将 prop-types 也打包到 DLL 文件中 */
/* 处于开发环境时将 react-immutable-proptypes 也打包到 DLL 文件中 */
/* 处于开发环境时将 redux-logger 也打包到 DLL 文件中 */
/* 处于开发环境时将 redux-form 也打包到 DLL 文件中，因此引用 redux-form 一般就是全部引用 */
/* 很少估计也是懒得单个引用 */
if (process.env.NODE_ENV !== 'production') {
  vendors.push('jquery')
  vendors.push('mockjs')
  vendors.push('moment')
  vendors.push('prop-types')
  vendors.push('react-immutable-proptypes')
  vendors.push('react-redux')
  vendors.push('react-router-dom')
  vendors.push('redux')
  vendors.push('redux-actions')
  vendors.push('redux-form')
  vendors.push('redux-logger')
}

module.exports = {
  context: __dirname,
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
