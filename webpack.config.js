var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/public/pizza/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3001/static/',
    // may not work with hot load with the chunking and all???
    sourceMapFilename: 'http://localhost:3001/static/[file].map'
  },
  // issues resolving jsx files ...
  // resolve: {
  //   extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
