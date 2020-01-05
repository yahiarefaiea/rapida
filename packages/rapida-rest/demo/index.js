const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const AbstractController = require('../src/abstract')

// setup express and mongoose
const app = express()
const database = 'mongodb://localhost:27017/rapida-rest'
mongoose.connect(database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create a new instance of the `AbstractController` and pass a Model to it
const Model = mongoose.model('Book', new mongoose.Schema({title: String, author: String}))
const controller = new AbstractController(Model)

// use the endpoints provided by the `controller`
app.get('/book', controller.getAll)
app.post('/book', controller.post)

app.listen(3000)
