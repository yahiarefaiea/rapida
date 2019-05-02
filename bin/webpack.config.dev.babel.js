import pkg from '../package.json'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

module.exports = merge(baseConfig, {
  stats: 'minimal',
  devtool: 'inline-source-map',
  watch: true,

  //  dev
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    clientLogLevel: 'none',
    compress: true,
    port: config.port,
    inline: true,
    noInfo: true
  },

  //  module
  module: {
    rules: [

    ]
  },

  //  plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      host: config.host,
      port: config.port + 1,
      ui: false,
      // and add other settings...
      proxy: `${config.host}:${config.port}`,
      files: [{
        match: [
          '**/*.pug',
          '**/*.styl'
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
