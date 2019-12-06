var express = require('express')
var response = require('../src/responses')
var app = express()

app.get('/book', function(req, res, next) {
  res.send(new response.Found({title: 'Book Title', author: 'Book Author'}, 'Book found'))
})

app.listen(3000)
