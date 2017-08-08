var plugins = [  // eslint-disable-line
  require('autoprefixer')({  // eslint-disable-line
    browsers: ['last 3 versions'],
  }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    require('cssnano')({  // eslint-disable-line
      preset: 'default',
    })  // eslint-disable-line
  )
}

module.exports = {
  plugins: plugins,  // eslint-disable-line
}
