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

// project variables
const port = normalizePort(process.env.PORT || '3000')
const localhost = 'local.dev'
const domain = 'nuotron.co'
const database = 'library'

app.set('port', port)
if(app.get('env') == 'development')
  app.set('url', `${localhost}:${port}`)
if(app.get('env') == 'production')
  app.set('url', domain)

// start message
console.log(chalk.cyan(`Running in ${app.get('env')} mode..`) // eslint-disable-line no-console

// connect to the database
mongoose.connect(`mongodb://${localhost}/${database}`)
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red('Failed to connect to the database')) // eslint-disable-line no-console
}).once('open', function() {
  console.log(chalk.green('Successfully connected to the database')) // eslint-disable-line no-console
})

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
  // if(req.subdomains.includes('api'))
  //   res.send('Error from api')
  // else if(req.subdomains.includes('control'))
  //   res.send('Error from control')
  // else
  //   res.send('Error from source')
})

module.exports = app
