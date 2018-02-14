import errHandle from 'rapid-error-handler'
import Book from './model'

// export function
module.exports = {
  // get all items
  getAll: function(req, res, next) {
    const query = {}
    if(req.query.read)
      query.read = req.query.read

    Book.find(query, function(err, books) {
      handler(err, res, next, books)
    })
  },

  // post new item
  post: function(req, res, next) {
    const book = new Book(req.body)

    book.save(function(err) {
      handler(err, res, next, book, 201)
    })
  },

  // find one item
  find: function(req, res, next) {
  },

  // get one item
  get: function(req, res, next) {
  },

  // update an item
  patch: function(req, res, next) {
  },

  // delete an item
  delete: function(req, res, next) {
  }
}

// handler function
function handler(err, res, next, message, status = 200) {
  if(err) next(new errHandle.BadRequest(err))
  else res.status(status).send(message)
}
