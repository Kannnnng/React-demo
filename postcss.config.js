module.exports = {
  plugins: (/*bundler*/) => [
    require('autoprefixer')({ browsers: ['last 3 versions', 'ie >= 9'] }),  // eslint-disable-line
    // require('postcss-import')({ addDependencyTo: bundler }),  // eslint-disable-line
    // require('cssnano')(),  // eslint-disable-line
  ]  // eslint-disable-line
}

