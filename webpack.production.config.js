var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR  = path.resolve(__dirname, 'src/client/public');
var APP_DIR    = path.resolve(__dirname, 'src/client/app');
var extractCSS = new ExtractTextPlugin('styles.css', {
  allChunks : true
});

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/App.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.css$/,
        loaders: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=10000!img?progressive=true'
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    extractCSS,
    new HtmlWebpackPlugin({
      title : 'tut1',
      template : APP_DIR + '/index.html'
    }),
    new webpack.DefinePlugin({
      'BASE_URL': JSON.stringify('https://tbergq.pythonanywhere.com'),
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  devServer: {
    hot: true,
    contentBase: './src/client/public'
  }
};

module.exports = config;