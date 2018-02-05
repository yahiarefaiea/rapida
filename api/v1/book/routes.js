import express from 'express'

// book imports
import bookController from './controller'

// export function
const book = function() {
  const bookRouter = express.Router()

  // codes goes here

  return bookRouter
}

module.exports = book
