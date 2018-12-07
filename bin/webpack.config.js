const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    clientLogLevel: 'none',
    compress: true,
    port: 3000
  },
  entry: {
    global: './app.js'
  },
  output: {
    filename: '[name].build.js',
    path: path.join(__dirname, 'dist')
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        //  production
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader?sourceMap',
          'stylus-loader?sourceMap'
        ]
        
        //  development
        // test: /\.styl$/,
        // use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].build.css",
      
      //  check what this line really means!!
      chunkFilename: "[id].css"
    }),
    // new webpack.optimize.CommonsChunkPlugin('vendors.js'),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3001,
      proxy: 'localhost:3000',
      files: [{
        match: [
          '**/*.html'
        ],
        fn: function(event, file) {
          if (event === "change") {
            const bs = require('browser-sync').get('bs-webpack-plugin');
            bs.reload();
          }
        }
      }],
    }, {reload: false})
  ]
};
