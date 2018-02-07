import express from 'express'

// admin imports
// import book from './book'

// export function
const admin = function() {
  const adminRouter = express.Router()

  // admin middlewares
  // adminRouter.use('/book', book())

  // todo: remove this test router
  adminRouter.get('/', function(req, res) {
    res.send('You\'re in Control!')
  })

  // todo: remove this test router
  adminRouter.get('/book', function(req, res) {
    res.send('You\'re in book!')
  })

  return adminRouter
}

module.exports = admin
