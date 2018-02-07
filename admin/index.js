import config from '../bin/config'
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

  adminRouter.get('/admin', function(req, res) {
    res.send('You\'re in admin!')
  })

  adminRouter.get('/404', function(req, res) {
    res.status(404).send('Admin 404')
  })

  adminRouter.get('*', function(req, res) {
    res.status(404).redirect(`http://control.${config.url()}/404`)
  })

  return adminRouter
}

module.exports = admin
