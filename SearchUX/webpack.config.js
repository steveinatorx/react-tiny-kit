var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  devServer: {
        inline:true,
        port: 8001 
  },
  entry: {
    app: ['./src/root.js']
  },
  output: {
          path: path.resolve(__dirname, "dist"),
          publicPath: '/dist/',
          filename: 'SearchUXBundle.js'
    },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          retainLines: true,
          cacheDirectory: true,
        }
      },
      {
        test: /.css$/,
        loaders: ['style', 'css']     
      }
    ]
  },
  resolve: {
      alias: {
          __CONFIG__: path.join(__dirname, 'config', process.env.REACT_ENV)
      }
  }
};
