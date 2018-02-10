import Errors from '../bin/errors'
import express from 'express'
const router = express.Router()

// export function
module.exports = function() {
  return router
    .get('/', function(req, res) {
      res.send('You\'re in client from client/index.js !')
    })
}
