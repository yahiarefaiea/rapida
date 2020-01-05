const axios = require('axios')
const camelCase = require('lodash/camelCase')

// global response interceptor for all axios calls
axios.interceptors.response.use(function(response) {
  return response.data
}, function(error) {
  if(error.response) return Promise.reject(error.response.data)
  else return Promise.reject(error)
})

module.exports = class Api {
  constructor(url) {
    this.url = url
    this.endpoints = {}
  }

  // create a single entity
  createEntity(entity) {
    entity = camelCase(entity)
    this.endpoints[entity] = this.createEndpoints(entity)
  }

  // create multiple entities
  createEntities(entities) {
    entities.forEach(this.createEntity.bind(this))
  }

  // create endpoints for the REST operations
  createEndpoints(entity) {
    const resourceURL = `${this.url}/${entity}`
    let endpoints = {}

    // default params: {}, default config: {}
    endpoints.getAll = function(params = {}, config = {}) {
      return axios.get(resourceURL, {params}, config)
    }

    // payload is required, default config: {}
    endpoints.post = function(payload, config = {}) {
      return axios.post(resourceURL, payload, config)
    }

    // id is required, default config: {}
    endpoints.get = function(id, config = {}) {
      return axios.get(`${resourceURL}/${id}`, config)
    }

    // id is required, payload is required, default config: {}
    endpoints.patch = function(id, payload, config = {}) {
      return axios.patch(`${resourceURL}/${id}`, payload, config)
    }

    // id is required, default config: {}
    endpoints.delete = function(id, config = {}) {
      return axios.delete(`${resourceURL}/${id}`, config)
    }

    return endpoints
  }
}
