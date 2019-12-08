const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const AbstractController = require('../src/abstract')

const app = express()
const database = 'mongodb://localhost:27017/rapida-rest'
mongoose.connect(database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const Model = mongoose.model('Book', new mongoose.Schema({title: String, author: String}))
const controller = new AbstractController(Model)

app.get('/book', controller.getAll)

app.listen(3000)
