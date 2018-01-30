import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.set('views', 'source/pug');
app.set('view engine', 'pug');

app.get('/book', function(req, res) {
  res.render('book', { name: 'Death of a dream', author: 'Paul Larosa' });
});

/* eslint-disable no-unused-vars */
app.listen(port, function(err) {
  // if(err) {
  //
  // } else {
  //
  // }
});
