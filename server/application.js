import express from 'express';

const port = 3000;
const app = express();

app.set('view engine', 'pug');

app.get('/book', function(req, res) {
  res.render('../source/pug/book', { name: 'Lorem Ipsum', author: 'Sed Do' });
});

/* eslint-disable no-unused-vars */
app.listen(port, function(err) {
  // if(err) {
  //
  // } else {
  //
  // }
});
