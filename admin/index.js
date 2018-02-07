import express from 'express'

// admin imports
// import books from './books'

// export function
const admin = function() {
  const adminRouter = express.Router()

  // admin middlewares
  // adminRouter.use('/books', books())

  adminRouter.get('/', function(req, res) {
    res.send('You\'re in Control!')
  })
  adminRouter.get('/books', function(req, res) {
    res.send('You\'re in Books!')
  })

  return adminRouter
}

module.exports = admin
