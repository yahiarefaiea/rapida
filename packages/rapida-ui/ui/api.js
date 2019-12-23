import config from '../bin/config'
import Api from '@rapida/rest-calls'

const api = new Api(config.apiUrl())
api.createEntity('book')

export default api.endpoints
