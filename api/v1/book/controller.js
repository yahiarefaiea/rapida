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
  }
  // todo: write other controllers here
}
