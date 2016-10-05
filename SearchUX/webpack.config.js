var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
          path:  './dist',
          filename: 'SearchUXBundle.js'
    },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};
