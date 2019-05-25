// api router
import express from 'express'
import errHandle from 'rapid-error-handler'
const router = express.Router()

// router imports
// import feature from './feature'

// export function
module.exports = function() {
  return router
    // router middlewares
    // .use('/feature', feature())

    .get('/', function(req, res) {
      res.send({'rapid': 'api'})
    })

    // error handler
    .use(function(req, res, next) {
      next(new errHandle.Forbidden())
    })
}
