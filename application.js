import config from './bin/config'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'
import api from './api'

const app = express()

// connect to the database
mongoose.connect(config.database(), {
  useCreateIndex: true,
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', function() {
  // eslint-disable-next-line no-console
  console.log(chalk.red(`Failed to connect to the \`${config.db.name}\` database`))
}).once('open', function() {
  // eslint-disable-next-line no-console
  console.log(chalk.cyan(`Successfully connected to the \`${config.db.name}\` database`))
})

// use middlewares
app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
app.use('/', api())

// error handler
app.use(function(err, req, res, next) {
  if(err && err.statusCode)
    res.status(err.statusCode).send({status: err.statusCode, message: err.message})
  else next(err)
})

module.exports = app
