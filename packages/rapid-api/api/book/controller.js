import pick from 'lodash/pick'
import AbstractController from './abst'
import Model from './model'

class Controller extends AbstractController {
  constructor(model) {
    super(model)
  }

  getAll(req, res, next) {
    req.query = pick(req.query, 'read')
    super.getAll(req, res, next)
  }

  post(req, res, next) {
    super.post(req, res, next)
  }

  // get(req, res, next) {
  //
  // }

  patch(req, res, next) {
    super.patch(req, res, next)
  }

  // delete(req, res, next) {
  //
  // }
}

export default new Controller(Model)
