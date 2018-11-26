import config from './bin/config'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'
import api from './api'

// instance of express
const app = express()

// start message
// eslint-disable-next-line no-console
console.log(chalk.cyan(`Running in ${config.env} mode`))

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
app.use(morgan(function(tokens, req, res) {
  let method = tokens.method(req, res)
  let url = req.headers.host + tokens.url(req, res)
  let status = chalk.cyan(tokens['status'](req, res))
  let responseTime = `${tokens['response-time'](req, res)} ms`
  return `${method} ${url} ${status} ${responseTime}`
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
app.use('/', api())

module.exports = app
