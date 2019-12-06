const axios = require('axios')
const camelCase = require('lodash/camelCase')

// response interceptor
axios.interceptors.response.use(function(response) {
  return response.data
}, function(error) {
  if(error.response) return Promise.reject(error.response.data)
  else return Promise.reject(error)
})

class Api {
  constructor(url) {
    this.url = url
    this.endpoints = {}
  }

  // create and store a single entity's endpoints
  createEntity(entity) {
    entity = camelCase(entity)
    this.endpoints[entity] = this.createEndpoints(entity)
  }

  createEntities(entities) {
    entities.forEach(this.createEntity.bind(this))
  }

  // create the basic endpoints handlers for REST operations
  createEndpoints(entity) {
    const resourceURL = `${this.url}/${entity}`
    let endpoints = {}

    endpoints.getAll = function(params = {}, config = {}) {
      return axios.get(resourceURL, {params}, config)
    }

    endpoints.post = function(payload, config = {}) {
      return axios.post(resourceURL, payload, config)
    }

    endpoints.get = function(id, config = {}) {
      return axios.get(`${resourceURL}/${id}`, config)
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
