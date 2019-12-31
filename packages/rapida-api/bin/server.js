import config from './config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import response from '@rapida/response'
import api from '../api'

const app = express()

/* eslint-disable no-console */

// start message
console.log(chalk.cyan(`Running in \`${config.env}\` mode`))

// connect to the database
mongoose.connect(config.database(), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', function() {
  console.log(chalk.red(`Failed to connect to the \`${config.db.name}\` database`))
}).once('open', function() {
  console.log(chalk.cyan(`Successfully connected to the \`${config.db.name}\` database`))
})

// use middlewares
app.use(cors())
app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// project middlewares
app.use('/', api())

// error handler
app.use(function(err, req, res, next) {
  if(err && err.status)
    res.status(err.status).send(new response.Good(null, err.message, err.status))
  else next(err)
})

// listen to port
app.listen(config.port, function() {
  console.log(chalk.cyan('Access URL is: ') +
  chalk.magenta(`http://${config.host}:${config.port}`))
})
