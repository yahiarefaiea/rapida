import config from './bin/config'
import express from 'express'
import favicon from 'serve-favicon'
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import chalk from 'chalk'

// instance of express
const app = express()
const compiler = webpack(webpackConfig)

// start message
// eslint-disable-next-line no-console
console.log(chalk.cyan(`Running in ${config.env} mode`))

// set view engine
app.set('views', '')
app.set('view engine', 'pug')

// use middlewares
app.use(express.static('storage'))
app.use(favicon('storage/favicon.png'))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

// project middlewares
app.get('*', function(req, res) {
  res.render('./ui/index')
})

module.exports = app
