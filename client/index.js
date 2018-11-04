// client router
import express from 'express'
import errHandle from 'rapid-error-handler'
const router = express.Router()

// router imports
// import library from './library'

// export function
module.exports = function() {
  const base = 'client'
  return router
    // router middlewares
    // .use('/library', library())

    // error handler
    .use(function(req, res, next) {
      next(new errHandle.NotFound())
    })
    .use(function(err, req, res, next) {
      const data = {
        status: err.statusCode,
        message: err.message,
        title: `${err.statusCode} ${err.message}`
      }
      if(err && err.statusCode)
        res.status(err.statusCode).render(`${base}/error`, data)
      else next(err)
    })
}
