import express from 'express'

// api imports
import v1 from './v1/routes'

// export function
const api = function() {
  const apiRouter = express.Router()

  // api middlewares
  // todo: use a subdomain instead
  apiRouter.use('/v1', v1())

  return apiRouter
}

module.exports = api
