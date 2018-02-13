// storage router
import express from 'express'
import errHandle from 'rapid-error-handler'
const router = express.Router()

// export function
module.exports = function() {
  return router
    // router middlewares
    .use(express.static('storage'))

    // error handler
    .use(function(req, res, next) {
      next(new errHandle.Forbidden())
    })
    .use(function(err, req, res, next) {
      if(err && err.statusCode)
        res.status(err.statusCode).send(`${err.statusCode} ${err.message}`)
      else next(err)
    })
}
