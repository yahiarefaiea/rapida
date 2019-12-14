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
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || kebabCase(pkg.name)
  },
  database: function() {
    return `mongodb://${this.db.host}:${this.db.port}/${this.db.name}`
  }
})
