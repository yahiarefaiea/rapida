import express from 'express'
import errHandle from 'rapid-error-handler'
const router = express.Router()

// import feature from './feature'

export default function() {
  return router
    // router middlewares
    // .use('/feature', feature())

    // todo: replace with real api
    .get('/feature', function(req, res) {
      res.send({'rapid': 'api'})
    })

    // error handler
    .use(function(req, res, next) {
      next(new errHandle.Forbidden())
    })
}
