const omit = require('lodash/omit')
const response = require('@rapida/response')

module.exports = class Abstract {
  constructor(model) {
    Abstract.model = model
  }

  getAll(req, res, next) {
    Abstract.model.find(req.query, function(err, resources) {
      if(err) next(new response.BadRequest(err))
      else res.send(new response.Found(resources))
    })
  }

  post(req, res, next) {
    req.body = Abstract.purgeBody(req.body)
    let resource = new Abstract.model(req.body)
    resource.save(function(err) {
      if(err) next(new response.BadRequest(err))
      else res.status(response.defaults.Created.status).send(new response.Created(resource))
    })
  }

  get(req, res, next) {
    Abstract.findById(req, res, next, function(resource) {
      res.send(new response.Found(resource))
    })
  }

  patch(req, res, next) {
    Abstract.findById(req, res, next, function(resource) {
      req.body = Abstract.purgeBody(req.body)
      for(let key in req.body) resource[key] = req.body[key]
      resource.save(function(err) {
        if(err) next(new response.BadRequest(err))
        else res.send(new response.Updated(resource))
      })
    })
  }

  delete(req, res, next) {
    Abstract.findById(req, res, next, function(resource) {
      resource.remove(function(err) {
        if(err) next(new response.BadRequest(err))
        else res.send(new response.Deleted())
      })
    })
  }

  static findById(req, res, next, callback) {
    Abstract.model.findById(req.params.id, function(err, resource) {
      if(err) next(new response.BadRequest(err))
      else if(!resource) next(new response.NotFound())
      else callback(resource)
    })
  }

  static purgeBody(body) {
    return omit(body, ['_id', 'createdAt', 'updatedAt', '__v'])
  }
}
