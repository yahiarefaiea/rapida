import pkg from '../package.json'
import config from './config'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import TerserJSPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import SitemapPlugin from 'sitemap-webpack-plugin'
import RobotstxtPlugin from 'robotstxt-webpack-plugin'

export default merge(baseConfig, {
  // optimization
  optimization: {
    minimizer: [
      // terser js plugin
      new TerserJSPlugin({}),

      // optimize css assets plugin
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
    }),

    new SitemapPlugin(config.sitemap.base, config.sitemap.paths, config.sitemap.options),

    new RobotstxtPlugin(config.robotstxt)
  ]
})
