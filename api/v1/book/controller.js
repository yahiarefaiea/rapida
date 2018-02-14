import errHandle from 'rapid-error-handler'
import Book from './model'

// export function
module.exports = {
  // get all items
  getAll: function(req, res, next) {
  },

  // post new item
  post: function(req, res, next) {
    const book = new Book(req.body)

    book.save(function(err) {
      handler(err, res, next, 201, book)
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
function handler(err, res, next, status, message) {
  if(err) next(new errHandle.BadRequest(err))
  else res.status(status).send(message)
}
