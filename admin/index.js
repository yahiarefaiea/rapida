// admin router
import express from 'express'
import errHandle from 'rapid-error-handler'
const router = express.Router()

// router imports
// import book from './book'

// export function
module.exports = function() {
  return router
    // router middlewares
    // .use('/book', book())

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
        res.status(err.statusCode).render('admin/error', data)
      else next(err)
    })
}
