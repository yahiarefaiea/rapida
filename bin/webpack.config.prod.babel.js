import pkg from '../package.json'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import koutoSwiss from 'kouto-swiss'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = merge(baseConfig, {
  // stats: 'minimal',??
  devtool: 'source-map',

  //  module
  module: {
    rules: [

      {
        test: /\.styl$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          // 'css-loader?sourceMap',
          {
            loader: 'stylus-loader',
            // loader: 'stylus-loader?sourceMap',
            options: {
              use: [koutoSwiss()]
            }
          }
        ]
      }
    ]
  },

  //  plugins
  plugins: [
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version}\n`+
              `${pkg.description}\n`+

              //  add author somewhere..
              `Last update on: ${new Date().getUTCFullYear()}/`+
              `${new Date().getUTCMonth()+1}/${new Date().getUTCDate()}\n`+
              `Released under the ${pkg.license} license.\n`+
              `hash:[hash], chunkhash:[chunkhash], file:[file]`
    }),


    //   check this out
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[chunkhash].css',
      chunkFilename: '[id].css'
    })
  ]
})
