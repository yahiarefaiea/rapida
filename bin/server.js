import config from './config'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'
import api from '../api'

const app = express()

// start message
/* eslint-disable no-console */
console.log(chalk.cyan(`Running in \`${config.env}\` mode`))

// connect to the database
mongoose.connect(config.database(), {
  useCreateIndex: true,
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red(`Failed to connect to the \`${config.db.name}\` database`))
}).once('open', function() {
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

// listen to port
app.listen(config.port, function() {
  console.log(chalk.cyan('Access URL is: ') +
  chalk.magenta(`http://${config.host}:${config.port}`))
})
