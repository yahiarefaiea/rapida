const express = require('express')
const response = require('@rapida/response')
const Api = require('../src/api')
const app = express()

const api = new Api('http://localhost:3000')
api.createEntity('book')

app.get('/book', function(req, res) {
  res.send(new response.Found({title: 'Book Title', author: 'Book Author'}))
})

/* eslint-disable no-console */
app.get('/test', function(req, res) {
  api.endpoints.book.getAll()
    .then(data => res.send(data))
    .catch(error => res.send(error))
})

app.listen(3000)
