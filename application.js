import config from './bin/config'
import subdomain from 'express-subdomain'
import express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import chalk from 'chalk'

// project imports
import storage from './storage'
import api from './api'
import admin from './admin'
import client from './client'

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

// set view engine
app.set('views', '')
app.set('view engine', 'pug')

// use middlewares
app.use(subdomain('storage', storage()))
app.use(favicon('storage/favicon.png'))
app.use(compression())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// project middlewares
app.use(subdomain('api', api()))
app.use(subdomain('control', admin()))
app.use('/', client())

module.exports = app
