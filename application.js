import config from './bin/config'
import express from 'express'
import favicon from 'serve-favicon'
import chalk from 'chalk'
import storage from './storage'
import ui from './ui'

// instance of express
const app = express()

// start message
console.log(chalk.cyan(`Running in ${config.env} mode`)) // eslint-disable-line no-console

// set view engine
app.set('views', '')
app.set('view engine', 'pug')

// use middlewares
app.use(express.static('storage'))
app.use(favicon('storage/favicon.png'))

// project middlewares
app.use('/', ui())

module.exports = app
