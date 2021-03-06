let path = require('path');
let  webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  devServer: {
        inline:false,
        port: 8001,
        historyApiFallback: true 
  },
  entry: 
    ['./src/root.js']
  ,
  output: {
          path: "./dist",
          publicPath: '/',
          filename: '/dist/appBundle.js'
    },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
        /*query: {
          retainLines: true,
          cacheDirectory: true
        }*/
      },
      {
        test: /.css$/,
        loaders: ['style', 'css']     
      },
      { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' },
    ]
  },
  resolve: {
      alias: {
          __CONFIG__: path.join(__dirname, 'config', process.env.REACT_ENV)
      }
  }
};
