// client router
import Errors from '../bin/errors'
import express from 'express'
const router = express.Router()

// export function
module.exports = function() {
  return router
    // router middlewares
    .use(express.static('public'))

    // error handler
    .use(function(req, res, next) {
      next(new Errors.NotFound())
    })
    .use(function(err, req, res, next) {
      const data = {
        status: err.statusCode,
        message: err.message,
        title: `${this.status} ${this.message}`
      }
      if(err && err.statusCode)
        res.status(err.statusCode).render('client/error', data)
      else next(err)
    })
}
