const express = require('express')
const Api = require('../src/api')
const app = express()

const api = new Api('http://localhost:3000')
api.createEntity('book')

app.get('/book', function(req, res, next) {
  res.send({data: {title: 'Book Title', author: 'Book Author'}, message: 'Book found'})
})

app.get('/test', function(req, res, next) {
  api.endpoints.book.getAll()
    // eslint-disable-next-line no-console
    .then(data => res.send(console.log(data)))
    // eslint-disable-next-line no-console
    .catch(error => res.send(console.log(error)))
})

app.listen(3000)
