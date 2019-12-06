const express = require('express')
const mongoose = require('mongoose')
const AbstractController = require('../src/abstract')

const app = express()
mongoose.connect('mongodb://localhost:27017/rapida-rest')
const Model = mongoose.model('Book', new mongoose.Schema({title: String, author: String}))
const controller = new AbstractController(Model)

app.get('/book', controller.getAll)

app.listen(3000)
