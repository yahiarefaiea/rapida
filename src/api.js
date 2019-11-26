var axios = require('axios')
var camelCase = require('lodash/camelCase')

class Api {
  constructor(data) {
    this.url = data.url
    this.endpoints = {}
  }

  // create and store a single entity's endpoints
  createEntity(entity) {
    let name = camelCase(entity.name)
    this.endpoints[name] = this.createEndpoints(entity)
  }

  createEntities(entities) {
    entities.forEach(this.createEntity.bind(this))
  }

  // create the basic endpoints handlers for REST operations
  createEndpoints(entity) {
    const resourceURL = `${this.url}/${entity.name}`
    let endpoints = {}

    endpoints.getAll = function(params = {}, config = {}) {
      return axios.get(resourceURL, {params}, config)
    }

    endpoints.get = function(id, config = {}) {
      return axios.get(`${resourceURL}/${id}`, config)
    }

    endpoints.post = function(payload, config = {}) {
      return axios.post(resourceURL, payload, config)
    }

    endpoints.patch = function(id, payload, config = {}) {
      return axios.patch(`${resourceURL}/${id}`, payload, config)
    }

    endpoints.delete = function(id, config = {}) {
      return axios.delete(`${resourceURL}/${id}`, config)
    }

    return endpoints
  }
}

module.exports = Api
