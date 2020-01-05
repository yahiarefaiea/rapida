import pkg from '../package.json'
import config from './config'
import moment from 'moment'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import TerserJSPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import SitemapPlugin from 'sitemap-webpack-plugin'
import RobotstxtPlugin from 'robotstxt-webpack-plugin'

export default merge(baseConfig, {
  optimization: {
    minimizer: [
      // minify javascript assets
      new TerserJSPlugin({}),

      // optimize and minimize css assets
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  // plugins
  plugins: [
    // add a banner to the top of each generated bundle
    new webpack.BannerPlugin({
      banner: `${config.project} v${pkg.version}\n` +
              `${config.meta().description}\n` +
              `Project produced by: ${config.meta().author}\n` +
              `${config.meta().url}\n` +
              '\n' +
              `Copyright (c) ${moment().format('YYYY')} ${config.meta().author}\n` +
              `Released under the ${pkg.license} license\n` +
              '\n' +
              `Latest update on: ${moment().format('YYYY.MM.DD')}\n` +
              'hash: [hash], chunkhash: [chunkhash]\n' +
              'file with contenthash: [file]'
    }),

    // generate a sitemap
    new SitemapPlugin(config.sitemap().base, config.sitemap().paths, config.sitemap().options),

    // generate a robots.txt
    new RobotstxtPlugin(config.robotstxt())
  ]
})
