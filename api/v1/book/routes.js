import express from 'express'

// book imports
import bookController from './controller'

// export function
const book = function() {
  const bookRouter = express.Router()

  // book routes
  bookRouter.route('/')
    .get(bookController.getAll)
    // todo: write other routes here

  return bookRouter
}

module.exports = book
