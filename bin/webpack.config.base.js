import pkg from '../package.json'
import config from './config'
import path from 'path'
import webpack from 'webpack'
import chalk from 'chalk'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

console.log(chalk.cyan(`Running in \`${config.env}\` mode`))

module.exports = {
  mode: config.env,
  entry: {
    global: path.join(__dirname, '../ui/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    // filename: '[name].bundle.[chunkhash].js',
    path: path.join(__dirname, '../dist')
  },

  //  module
  module: {
    rules: [

      //  babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            // or
            // presets: ['@babel/env']
          }
        }
      },

      //  render pug
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      }


    ]
  },

  //  plugins
  plugins: [
    //  html
    new HtmlWebpackPlugin({
      template: 'ui/index.pug',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    //  copy files
    new CopyPlugin([{ from: 'static/' }])
  ]
}
