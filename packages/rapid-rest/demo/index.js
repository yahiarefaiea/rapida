var express = require('express')
var mongoose = require('mongoose')
var AbstractController = require('../src/abstract')

var app = express()
mongoose.connect('mongodb://localhost:27017/rapid-rest')
var Model = mongoose.model('Book', new mongoose.Schema({title: String, author: String}))
var controller = new AbstractController(Model)

app.get('/book', controller.getAll)

app.listen(3000)
