import pkg from '../package.json'

// export function
module.exports = {
  project: pkg.name,
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localtest.me',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localtest.me',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || pkg.name
  },
  database: function() {
    return `mongodb://${this.db.host}:${this.db.port}/${this.db.name}`
  }
}
