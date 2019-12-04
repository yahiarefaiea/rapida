import express from 'express'
import controller from './controller'
const book = express.Router()

export default function() {
  book.route('/')
    .get(controller.getAll)
    .post(controller.post)

  book.use('/:id', controller.find)
  book.route('/:id')
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.delete)

  return book
}
