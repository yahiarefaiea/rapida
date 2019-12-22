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
      banner: `${config.project} v${pkg.version}\n` +
              `${config.meta.description}\n` +
              `Project produced by: ${config.meta.author}\n` +
              `${config.meta.url}\n` +
              '\n' +
              `Latest update on: ${new Date().getUTCFullYear()}.` +
              `${new Date().getUTCMonth() + 1}.${new Date().getUTCDate()}\n` +
              `Released under the ${pkg.license} license.\n` +
              '\n' +
              'hash: [hash], chunkhash: [chunkhash]\n' +
              'file with contenthash: [file]'
    }),

    new SitemapPlugin(config.sitemap.base, config.sitemap.paths, config.sitemap.options),

    new RobotstxtPlugin(config.robotstxt)
  ]
})
