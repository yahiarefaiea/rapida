import pkg from '../package.json'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

module.exports = merge(baseConfig, {
  devtool: 'source-map',

  // plugins
  plugins: [
    // banner plugin
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version}\n` +
              `${pkg.description}\n` +
              `Project produced by: ${pkg.author}\n` +
              `Latest update on: ${new Date().getUTCFullYear()}.` +
              `${new Date().getUTCMonth() + 1}.${new Date().getUTCDate()}\n` +
              `Released under the ${pkg.license} license.`
    })
  ]
})
