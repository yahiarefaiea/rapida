import config from '../bin/config'
import subdomain from 'express-subdomain'
import express from 'express'

// api imports
const current = 'v1'
import v1 from './v1'

// export function
const api = function() {
  const apiRouter = express.Router()

  // api middlewares
  apiRouter.use(subdomain('v1', v1()))

  apiRouter.get('/', function(req, res) {
    res.send(`http://${current}.api.${config.url()}`)
  })

  return apiRouter
}

module.exports = api
