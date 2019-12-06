import express from 'express'
import response from 'rapid-response'
const router = express.Router()

import book from './book'

export default function() {
  return router
    // router middlewares
    .use('/book', book())

    // error handler
    .use(function(req, res, next) {
      next(new response.Forbidden())
    })
}
