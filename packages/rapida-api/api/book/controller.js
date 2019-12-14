import pick from 'lodash/pick'
import AbstractController from '@rapida/rest'
import Model from './model'

class Controller extends AbstractController {
  constructor(model) {
    super(model)
  }

  getAll(req, res, next) {
    req.query = pick(req.query, 'read')
    super.getAll(req, res, next)
  }
}

export default new Controller(Model)
