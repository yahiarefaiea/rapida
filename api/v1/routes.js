import express from 'express'

// v1 imports
import book from './book/routes'
import bookModel from './book/model'

// export function
const v1 = function() {
  const v1Router = express.Router()

  // v1 middlewares
  v1Router.use('/book', book(bookModel))

  return v1Router
}

module.exports = v1
