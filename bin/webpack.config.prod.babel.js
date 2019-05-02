import pkg from '../package.json'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

module.exports = merge(baseConfig, {
  // stats: 'minimal',??
  devtool: 'source-map',

  //  module
  module: {
    rules: [

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
    })
  ]
})
