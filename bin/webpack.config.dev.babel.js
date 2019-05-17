import config from './config'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

module.exports = merge(baseConfig, {
  stats: 'minimal',
  devtool: 'inline-source-map',
  watch: true,

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    clientLogLevel: 'none',
    compress: true,
    port: config.port - 1,
    inline: true,
    noInfo: true
  },

  // plugins
  plugins: [
    // hot module replacement plugin
    new webpack.HotModuleReplacementPlugin(),

    // browser sync plugin
    new BrowserSyncPlugin({
      ui: false,
      host: config.host,
      port: config.port,
      proxy: `${config.host}:${config.port - 1}`,
      files: [{
        match: [
          '**/*.pug'
        ],
        fn: function(event, file) {
          if(event === 'change') {
            const bs = require('browser-sync').get('bs-webpack-plugin')
            bs.reload()
          }
        }
      }]
    }, {reload: false})
  ]
})
