import express from 'express'

const port = process.env.PORT || 3000
const app = express()

app.use(express.static('public'))
// app.use(express.static('storage'))

app.set('views', 'source/pug')
app.set('view engine', 'pug')










app.get('/', function(req, res) {
  res.redirect('/book')
})

app.get('/book', function(req, res) {
  res.render('book', { name: 'Death of a dream', author: 'Paul Larosa' })
})

app.listen(port)
