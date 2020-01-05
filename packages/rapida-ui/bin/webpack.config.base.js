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

// start message
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

  // split bundles to chunks
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
    // generate and inject the necessary tags into the `.pug` template
    new HtmlWebpackPlugin({
      template: 'ui/index.pug',
      meta: config.meta()
    }),

    // extract css into separate files
    new MiniCssExtractPlugin({
      filename: config.devMode() ? '[name].bundle.css' : '[name].bundle.[contenthash].css'
    }),

    // generate icons
    new FaviconsWebpackPlugin({
      logo: './static/images/logo.svg',
      prefix: 'icons',
      favicons: {
        background: config.background,
        theme_color: config.themeColor // eslint-disable-line camelcase
      }
    }),

    // copy the `static/` to the `dist/`
    new CopyPlugin([{
      from: 'static/'
    }]),

    // compress all images
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: config.devMode()
    }),

    // enable caching
    new webpack.HashedModuleIdsPlugin()
  ],

  // loaders
  module: {
    rules: [
      // babel loader
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

      // pug loader
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

      // stylus loader
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
