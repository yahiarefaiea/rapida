var express = require('express')
var Api = require('../src/api')
var app = express()

var api = new Api('http://localhost:3000')
api.createEntity('book')

app.get('/book', function(req, res, next) {
  res.send({data: {title: 'Book Title', author: 'Book Author'}, message: 'Book found'})
})

app.get('/test', function(req, res, next) {
  api.endpoints.book.getAll()
  .then(data => res.send(console.log(data)))
  .catch(error => res.send(console.log(error)))
})

app.listen(3000)
