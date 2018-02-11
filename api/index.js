// api router
import Errors from '../bin/errors'
import subdomain from 'express-subdomain'
import express from 'express'
const router = express.Router()

// router imports
import v1 from './v1'

// export function
module.exports = function() {
  return router
    // router middlewares
    .use(subdomain('v1', v1()))

    // error handler
    .use(function(req, res, next) {
      next(new Errors.Forbidden())
    })
    .use(function(err, req, res, next) {
      if(err && err.statusCode)
        res.status(err.statusCode).json({status: err.statusCode, message: err.message})
      else next(err)
    })
}
