// book imports
import Book from './model'

// export function
module.exports = {
  getAll: function(req, res) {
    Book.find(function(err, books) {
      if(err) return res.status(500).send(err)
      res.json(books)
    })
  }
  // todo: write other controllers here
}
