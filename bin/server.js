import config from './config'
import app from '../application'
import Debug from 'debug'
const debug = Debug(`${config.project}:server`)
import http from 'http'
import chalk from 'chalk'

// get port from config
const port = config.port

// start message
// eslint-disable-next-line no-console
console.log(chalk.cyan(`Running in ${config.env} mode`))
// eslint-disable-next-line no-console
console.log(chalk.cyan('Access URL is: ') +
chalk.magenta(`http://${config.host}:${config.port}`))

// create an HTTP server
const server = http.createServer(app)

// listen on provided port, on all network interfaces
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

// event listener for HTTP server 'error' event
/* eslint-disable no-console */
function onError(error) {
  if(error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(`${bind} requires elevated privileges`)
    process.exit(1)
    break
  case 'EADDRINUSE':
    console.error(`${bind} is already in use`)
    process.exit(1)
    break
  default:
    throw error
  }
}

// event listener for HTTP server 'listening' event
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
