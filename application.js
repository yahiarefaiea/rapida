import config from './bin/config'
import express from 'express'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

const app = express()
const compiler = webpack(webpackConfig)

// set view engine
app.set('views', '')
app.set('view engine', 'pug')

// use middlewares
app.use(express.static('storage'))
app.use(favicon('storage/favicon.png'))
app.use(morgan('dev'))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

// project middlewares
app.get('*', function(req, res) {
  res.render('./ui/index')
})

// error handler
app.use(function(err, req, res, next) {
  if(err && err.statusCode)
    res.status(err.statusCode).send({status: err.statusCode, message: err.message})
  else next(err)
})

module.exports = app
