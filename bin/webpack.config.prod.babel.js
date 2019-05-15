import pkg from '../package.json'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

module.exports = merge(baseConfig, {
  devtool: 'source-map',

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  //  plugins
  plugins: [
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version}\n` +
              `${pkg.description}\n` +

              //  add author somewhere..
              `Last update on: ${new Date().getUTCFullYear()}/` +
              `${new Date().getUTCMonth() + 1}/${new Date().getUTCDate()}\n` +
              `Released under the ${pkg.license} license.\n` +
              'hash:[hash], chunkhash:[chunkhash], file:[file]'
    }),

    new webpack.HashedModuleIdsPlugin()
  ]
})
