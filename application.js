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

// start message
/* eslint-disable no-console */
console.log(chalk.cyan(`Running in ${config.env} mode`))

// connect to the database
mongoose.connect(config.database())
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red('Failed to connect to the database'))
}).once('open', function() {
  console.log(chalk.green('Successfully connected to the database'))
})
/* eslint-enable no-console */

// use middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
app.use(subdomain('api', api()))
app.use(subdomain('control', admin()))
app.use('/', source())

// catch 404 and forward to error handler
/* eslint-disable no-unused-vars */
app.use(function(req, res, next) {
  const err = new Error('Nothing found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = config.env === 'development' ? err : {}

  // redirect to the error page
  res.status(err.status || 500)
  if(req.subdomains.includes('api'))
    res.send('Nothing found')
  else if(req.subdomains.includes('control'))
    res.redirect(`http://control.${config.url()}/404`)
  else
    res.redirect(`http://${config.url()}/404`)
})

module.exports = app
