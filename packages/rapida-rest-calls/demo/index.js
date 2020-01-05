const express = require('express')
const morgan = require('morgan')
const response = require('@rapida/response')
const Api = require('../src/api')

const app = express()
app.use(morgan('dev'))

app.get('/book', function(req, res) {
  res.send(new response.Found({title: 'Book Title', author: 'Book Author'}))
})

/* eslint-disable no-console */

// create a new instance of the `Api`
const api = new Api('http://localhost:3000')

// create a new entity
api.createEntity('book')

// use the endpoints provided by the `api`
api.endpoints.book.getAll()
  .then(data => console.log(data))
  .catch(error => console.log(error))

app.listen(3000)
