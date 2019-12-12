const express = require('express')
const response = require('../src/responses')
const app = express()

app.get('/book', function(req, res) {
  res.send(new response.Found({title: 'Book Title', author: 'Book Author'}, 'Book found'))
})

app.listen(3000)
