import pkg from '../package.json'

module.exports = {
  project: pkg.name,
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || pkg.name
  },
  database: function() {
    return `mongodb://${this.db.host}:${this.db.port}/${this.db.name}`
  }
}
