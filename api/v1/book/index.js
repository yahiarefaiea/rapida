// book router
import express from 'express'
const router = express.Router()

// router imports
import controller from './controller'

// export function
module.exports = function() {
  router.route('/')
    .get(controller.getAll)
    .post(controller.post)

  router.use('/:id', controller.find)
  router.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.delete)

  return router
}
