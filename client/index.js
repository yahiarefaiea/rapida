import Errors from '../bin/errors'
import express from 'express'
const router = express.Router()

// export function
module.exports = function() {
  return router

    // error handler
    .use(function(req, res, next) {
      next(new Errors.NotFound())
    })
    .use(function(err, req, res, next) {
      if(err && err.statusCode) {
        res.status(err.statusCode).send(`${err.statusCode} ${err.message}`)
      } else next(err)
    })
}
