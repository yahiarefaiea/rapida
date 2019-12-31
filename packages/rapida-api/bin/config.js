import kebabCase from 'lodash/kebabCase'
import pkg from '../package.json'

export default Object.freeze({
  project: kebabCase(pkg.name),
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  database: function() {
    const uri = process.env.MONGODB_URI || `mongodb://localhost:27017/${this.project}`
    return uri
  },
  devMode: function() {
    if(this.env === 'development') return true
  }
})
