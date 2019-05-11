import pkg from '../package.json'
import config from './config'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import koutoSwiss from 'kouto-swiss'
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
    port: config.port - 1,
    inline: true,
    noInfo: true
  },

  //  module
  module: {
    rules: [

      //  stylusss
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', {
          loader: 'stylus-loader',
          options: {
            use: [koutoSwiss()]
          }
        }]
      }

    ]
  },

  //  plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      ui: false,
      host: config.host,
      port: config.port,
      // and add other settings...
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
