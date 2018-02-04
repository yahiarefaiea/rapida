import express from 'express'
import favicon from 'serve-favicon'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

// project imports
import api from './api/routes'

// connect to the database
const db = mongoose.connect('mongodb://localhost/library')

// create an instance of express
const app = express()

// set view engine
app.set('views', 'source')
app.set('view engine', 'pug')

// use middlewares
// todo: use a subdomain instead, like 'storage.nuotron.co'
// and use it only if in production mode
// otherwise, use it as a directory
app.use('/storage', express.static('storage'))
app.use(express.static('public'))
app.use(favicon('storage/favicon.png'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
// todo: use a subdomain instead
app.use('/api', api())

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

  // render the error page
  res.status(err.status || 500)
  // todo: create an error page
  res.send('Something went wrong')
})

module.exports = app
