import config from './bin/config'
import subdomain from 'express-subdomain'
import express from 'express'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'

// project imports
import api from './api'
import admin from './admin'
import source from './source'

// instance of express
const app = express()

// project variables
app.set('localhost', config.localhost)
app.set('domain', config.domain)
app.set('port', config.port())

if(app.get('env') === 'development') {
  app.set('url', `${config.localhost}:${config.port()}`)
  app.set('database', `mongodb://${config.localhost}/${config.database}`)
} else if(app.get('env') === 'production') {
  app.set('url', config.domain)
  app.set('database', `mongodb://${config.domain}/${config.database}`)
}

// start message
console.log(chalk.cyan(`Running in ${app.get('env')} mode`))

// connect to the database
mongoose.connect(app.get('database'))
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red('Failed to connect to the database'))
}).once('open', function() {
  console.log(chalk.green('Successfully connected to the database'))
})

// use middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
app.use(subdomain('api', api()))
app.use(subdomain('control', admin()))
app.use('/', source())

/* eslint-disable no-unused-vars */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // redirect to the error page
  res.status(err.status || 500)
})

module.exports = app
