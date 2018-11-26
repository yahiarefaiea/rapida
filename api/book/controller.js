import errHandle from 'rapid-error-handler'
import omit from 'lodash/omit'
import slug from 'limax'
import Book from './model'

// export function
module.exports = {
  // get all items
  getAll: function(req, res, next) {
    const query = {}
    if(req.query.read) query.read = req.query.read

    Book.find(query, function(err, books) {
      handler(err, next, function() {
        res.send({
          total: books.length,
          books: books.map(function(book) {
            book.request = bookUrl(req, book)
            return book
          })
        })
      })
    })
  },

  // post new item
  post: function(req, res, next) {
    bookStrict(req.body)
    const book = new Book(req.body)
    book.request = bookUrl(req, book)

    book.save(function(err) {
      handler(err, next, function() {
        res.status(201).send({
          status: 201,
          message: 'Book has added',
          book: book
        })
      })
    })
  },

  // find one item
  find: function(req, res, next) {
    Book.findById(req.params.id, function(err, book) {
      handler(err, next, function() {
        if(book) {
          req.book = book
          next()
        } else next(new errHandle.NotFound('Book not found'))
      })
    })
  },

  // get one item
  get: function(req, res) {
    req.book.filterByRead = {
      type: 'GET',
      url: `http://${req.headers.host}/book?read=${req.book.read}`
    }
    res.send({book: req.book})
  },

  // update an item
  patch: function(req, res, next) {
    bookStrict(req.body)
    for(const key in req.body) req.book[key] = req.body[key]

    req.book.save(function(err) {
      handler(err, next, function() {
        res.send({
          status: 200,
          message: 'Book has updated',
          book: req.book
        })
      })
    })
  },

  // delete an item
  delete: function(req, res, next) {
    req.book.remove(function(err) {
      handler(err, next, function() {
        res.send({
          status: 200,
          message: 'Book has removed'
        })
      })
    })
  }
}

// handler function
function handler(err, next, callback) {
  if(err) next(new errHandle.BadRequest(err))
  else callback()
}

// book url function
function bookUrl(req, book) {
  return {
    type: 'GET',
    url: `http://${req.headers.host}/book/${book._id}`
  }
}

// book strict function
function bookStrict(req) {
  //do slug here
  // if(req.title) req.title = startCase(toLower(req.title))
  return omit(body, ['_id', 'createdAt', 'updatedAt', '__v'])
}
