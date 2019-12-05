import express from 'express'
import controller from './controller'
const router = express.Router()

export default function() {
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
