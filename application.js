import config from './bin/config'
import subdomain from 'express-subdomain'
import express from 'express'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'

// project imports
// import api from './api'
// import admin from './admin'
// import source from './source'

// instance of express
const app = express()

// use middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
// app.use(subdomain('api', api()))
// app.use(subdomain('control', admin()))
// app.use('/', source())

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
