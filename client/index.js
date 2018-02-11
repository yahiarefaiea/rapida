// client router
import Errors from '../bin/errors'
import express from 'express'
const router = express.Router()

// router imports
// import library from './library'

// export function
module.exports = function() {
  return router
    // router middlewares
    // .use('/library', library())

    .get('/', function(req, res) {
      res.send('Homepage')
    })
    .get('/library', function(req, res) {
      res.send('Library')
    })

    // error handler
    .use(function(req, res, next) {
      next(new Errors.NotFound())
    })
    .use(function(err, req, res, next) {
      const data = {
        status: err.statusCode,
        message: err.message,
        title: `${err.statusCode} ${err.message}`
      }
      if(err && err.statusCode)
        res.status(err.statusCode).render('client/error', data)
      else next(err)
    })
}
