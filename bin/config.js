module.exports = {
  localhost: 'local.dev',
  domain: 'nuotron.co',
  database: 'library',
  port: function() {
    const val = process.env.PORT || '3000'
    const port = parseInt(val, 10)

    if(isNaN(port)) return val
    if(port >= 0) return port
    return false
  }
}
