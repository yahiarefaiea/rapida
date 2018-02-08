import config from '../bin/config'
import express from 'express'

// client imports
// import library from './library'

// export function
const client = function() {
  const clientRouter = express.Router()

  // client middlewares
  // clientRouter.use('/library', library())

  clientRouter.get('/', function(req, res) {
    res.send('You\'re in client!')
  })

  // clientRouter.get('/client', function(req, res) {
  //   res.send('You\'re in client!')
  // })

  // clientRouter.get('/404', function(req, res) {
  //   res.status(404).send('client 404')
  // })
  //
  // clientRouter.get('*', function(req, res) {
  //   res.redirect(`http://${config.url()}/404`)
  // })

  return clientRouter
}

module.exports = client
