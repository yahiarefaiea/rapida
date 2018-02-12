module.exports = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'local.dev',
  port: process.env.PORT || '3000',
  db: {
    host: process.env.DB_HOST || 'local.dev',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || process.argv0
  },
  database: function() {
    return `mongodb://${this.db.host}:${this.db.port}/${this.db.name}`
  }
}
