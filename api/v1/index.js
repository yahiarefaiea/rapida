// api v1 router
import express from 'express'
const router = express.Router()

// router imports
import book from './book'
import author from './author'

// export function
module.exports = function() {
  return router
    // router middlewares
    .use('/book', book())
    .use('/author', author())
}
