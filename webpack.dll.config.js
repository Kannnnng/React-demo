var path = require('path')  // eslint-disable-line
var webpack = require('webpack')  // eslint-disable-line
var ROOT_PATH = path.resolve(__dirname)  // eslint-disable-line
var APP_PATH = path.resolve(ROOT_PATH, 'app')  // eslint-disable-line
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')  // eslint-disable-line

const vendors = [
  'axios',
  'babel-polyfill',
  'immutable',
  'lodash',
  'material-ui',
  'md5',
  'moment',
  'normalizr',
  'prop-types',
  'react',
  'react-dom',
  'react-redux',
  'react-router-dom',
  'react-router-redux',
  'react-tap-event-plugin',
  'redux',
  'redux-actions',
]

module.exports = {
  entry: {
    vendor: vendors,
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].dll.js',
    library: '[name]_library',
  },
  plugins: [
    /* 声明此时的环境是生产环境，这样能够避免开发环境中的一些错误或警告显示代码被打包到文件中 */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    /* 压缩 JS 文件， */
    new webpack.optimize.UglifyJsPlugin({
      /* 已经压缩过的文件不再次进行压缩 */
      exclude: /\.min\.js$/,
      compress: {
        /* 消除产生警告的代码，此类代码多来自于引用的模块内部 */
        warnings: false,
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
      path: path.resolve(BUILD_PATH, '[name].manifest.json'),
      name: '[name]_library',
      context: __dirname,
    }),
  ],
}
