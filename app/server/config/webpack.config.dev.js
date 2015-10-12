var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    __dirname + '/../../client/render'
  ],
  output: {
    path: __dirname + '/../../public/js/',
    filename: 'app.js',
    publicPath: 'http://localhost:8081/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test:/\.jsx$/,
        loaders: ["react-hot", 'babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
};