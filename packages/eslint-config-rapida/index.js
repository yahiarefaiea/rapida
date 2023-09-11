const rules = require('./rules')

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    node: true,
    es2020: true,
    browser: true,
    mocha: true
  },
  rules
}
