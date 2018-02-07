import config from '../bin/config'
import express from 'express'

// source imports
// import library from './library'

// export function
const source = function() {
  const sourceRouter = express.Router()

  // source middlewares
  // sourceRouter.use('/library', library())

  sourceRouter.get('/', function(req, res) {
    res.send('You\'re in Source!')
  })

  sourceRouter.get('/source', function(req, res) {
    res.send('You\'re in source!')
  })

  sourceRouter.get('/404', function(req, res) {
    res.status(404).send('Source 404')
  })

  sourceRouter.get('*', function(req, res) {
    res.redirect(`http://${config.url()}/404`)
  })

  return sourceRouter
}

module.exports = source
