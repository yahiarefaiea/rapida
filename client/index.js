// client router
import Errors from '../bin/errors'
import express from 'express'
const router = express.Router()

// export function
module.exports = function() {
  return router
    // router middlewares
    .use(express.static('client/public'))

    // error handler
    .use(function(req, res, next) {
      next(new Errors.NotFound())
    })
    .use(function(err, req, res, next) {
      if(err && err.statusCode)
        res.status(err.statusCode).render('client/error', {status: err.statusCode, message: err.message})
      else next(err)
    })
}
