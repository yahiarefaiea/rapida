import pkg from '../package.json'

// export function
module.exports = {
  project: pkg.name,
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localtest.me',
  port: process.env.PORT || 3000
}
