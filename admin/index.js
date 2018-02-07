import express from 'express'

// admin imports
// import book from './book'

// export function
const admin = function() {
  const adminRouter = express.Router()

  // admin middlewares
  // adminRouter.use('/book', book())

  adminRouter.get('/', function(req, res) {
    res.send('You\'re in Control!')
  })

  adminRouter.get('/book', function(req, res) {
    res.send('You\'re in book!')
  })

  adminRouter.get('/404', function(req, res) {
    res.send('Admin 404')
  })

  return adminRouter
}

module.exports = admin
