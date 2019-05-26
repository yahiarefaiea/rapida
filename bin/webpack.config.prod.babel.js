import pkg from '../package.json'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseConfig, {
  // optimization
  optimization: {
    minimizer: [
      // TerserJSPlugin
      new TerserJSPlugin({}),

      // OptimizeCSSAssetsPlugin
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  // plugins
  plugins: [
    // banner plugin
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version}\n` +
              `${pkg.description}\n` +
              `Project produced by: ${pkg.author}\n` +
              `Latest update on: ${new Date().getUTCFullYear()}.` +
              `${new Date().getUTCMonth() + 1}.${new Date().getUTCDate()}\n` +
              `Released under the ${pkg.license} license.\n` +
              'hash: [hash], chunkhash: [chunkhash]\n' +
              'file with contenthash: [file]'
    })
  ]
})
