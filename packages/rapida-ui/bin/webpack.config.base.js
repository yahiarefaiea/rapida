import config from './config'
import path from 'path'
import webpack from 'webpack'
import chalk from 'chalk'
import koutoSwiss from 'kouto-swiss'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'

// eslint-disable-next-line no-console
console.log(chalk.cyan(`Running in \`${config.env}\` mode`))

export default {
  mode: config.env,
  entry: {
    main: path.join(__dirname, '../ui/index.js')
  },
  output: {
    filename: config.devMode() ? '[name].bundle.js' : '[name].bundle.[contenthash].js',
    path: path.join(__dirname, '../dist')
  },

  // optimization
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  // plugins
  plugins: [
    // html webpack plugin
    new HtmlWebpackPlugin({
      template: 'ui/index.pug',
      meta: config.meta
    }),

    // mini css extract plugin
    new MiniCssExtractPlugin({
      filename: config.devMode() ? '[name].bundle.css' : '[name].bundle.[contenthash].css'
    }),

    new FaviconsWebpackPlugin({
      logo: './static/images/logo.svg',
      prefix: 'favicons',
      favicons: {
        background: config.background,
        theme_color: config.themeColor
      }
    }),

    // copy plugin
    new CopyPlugin([{
      from: 'static/'
    }]),

    // imagemin plugin
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: config.devMode()
    }),

    // hashed module ids plugin
    new webpack.HashedModuleIdsPlugin()
  ],

  // module
  module: {
    rules: [
      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // pug
      {
        test: /\.pug$/,
        use: ['html-loader', {
          loader: 'pug-html-loader',
          options: {
            data: {
              title: config.title,
              lang: config.lang,
              dir: config.dir
            }
          }
        }]
      },

      // stylus
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: config.devMode(),
              reloadAll: true
            }
          },
          'css-loader?sourceMap',
          {
            loader: 'stylus-loader?sourceMap',
            options: {
              use: [koutoSwiss()]
            }
          }
        ]
      }
    ]
  }
}
