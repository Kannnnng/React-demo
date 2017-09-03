var plugins = [  // eslint-disable-line
  require('autoprefixer')({  // eslint-disable-line
    browsers: ['last 3 versions'],
  }),
]

/* 已经使用 optimize-css-assets-webpack-plugin 进行 CSS 代码的压缩工作 */
// if (process.env.NODE_ENV === 'production') {
//   plugins.push(
//     require('cssnano')({  // eslint-disable-line
//       preset: 'default',
//     })  // eslint-disable-line
//   )
// }

module.exports = {
  plugins: plugins,  // eslint-disable-line
}
