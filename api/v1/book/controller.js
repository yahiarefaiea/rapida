// book imports
import Book from './model'

// export function
module.exports = {
  getAll: function(req, res) {
    const query = {}
    if(req.query.author)
      query.author = req.query.author

    Book.find(query, function(err, books) {
      if(err)
        return res.status(500).send(err)
      res.json(books)
    })
  },
  get: function(req, res) {
    Book.findById(req.params.id, function(err, book) {
      if(err)
        return res.status(500).send(err)
      res.json(book)
    })
  }
  // todo: write other controllers here
}
