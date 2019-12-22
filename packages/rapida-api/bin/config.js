import kebabCase from 'lodash/kebabCase'
import pkg from '../package.json'

export default Object.freeze({
  project: kebabCase(pkg.name),
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  devMode: function() {
    if(this.env === 'development') return true
  },
  database: process.env.MONGODB_URI || `mongodb://localhost:27017/${kebabCase(pkg.name)}`
})
