import config from '../bin/config'
import Api from 'rapid-rest-calls'

const api = new Api(config.baseUrl())
api.createEntity('book')

export default api.endpoints
