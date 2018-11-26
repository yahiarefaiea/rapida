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
console.log(chalk.cyan(`Running in ${config.env} mode`)) // eslint-disable-line no-console

// connect to the database
mongoose.connect(config.database(), {
  useCreateIndex: true,
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red(`Failed to connect to the \`${config.db.name}\` database`)) // eslint-disable-line no-console
}).once('open', function() {
  console.log(chalk.cyan(`Successfully connected to the \`${config.db.name}\` database`)) // eslint-disable-line no-console
})

// use middlewares
app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
app.use('/', api())

module.exports = app
