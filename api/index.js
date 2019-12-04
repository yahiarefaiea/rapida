import express from 'express'
import errHandle from 'rapid-error-handler'
const router = express.Router()

import book from './book'

export default function() {
  return router
    // router middlewares
    .use('/book', book())

    // error handler
    .use(function(req, res, next) {
      next(new errHandle.Forbidden())
    })
}
