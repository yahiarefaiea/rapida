import config from '../../bin/config'
import express from 'express'

// v1 imports
// import book from './book'

// export function
const v1 = function() {
  const v1Router = express.Router()

  // v1 middlewares
  // v1Router.use('/book', book())

  v1Router.get('/book', function(req, res) {
    res.json({name: 'Brian'})
  })

  v1Router.get('*', function(req, res) {
    res.redirect(`http://${config.url()}`)
  })

  return v1Router
}

module.exports = v1
