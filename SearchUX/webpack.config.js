var path = require('path');

module.exports = {
  entry: {
    app: ['./src/app.js']
  },
  devTool: 'source-map',
  devServer: { inline: true },
  output: {
          path: path.resolve(__dirname, "dist"),
          publicPath: '/dist/',
          filename: 'SearchUXBundle.js'
    },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: './node_modules',
        loader: 'babel',
        query: { presets: [ 'es2015', 'react' ] }
      }
    ]
  }
};
