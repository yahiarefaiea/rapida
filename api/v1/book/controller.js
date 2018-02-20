import errHandle from 'rapid-error-handler'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'
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
            const response = bookResponse(book)
            response.request = bookUrl(req, book)
            return response
          })
        })
      })
    })
  },

  // post new item
  post: function(req, res, next) {
    bookStrict(req)
    const book = new Book(req.body)
    const response = bookResponse(book)
    response.request = bookUrl(req, book)

    book.save(function(err) {
      handler(err, next, function() {
        res.status(201).send({
          status: 201,
          message: 'Book has added',
          book: response
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
    const response = bookResponse(req.book)
    response.filterByRead = {
      type: 'GET',
      url: `http://${req.headers.host}/book?read=${response.read}`
    }
    res.send({book: response})
  },

  // update an item
  patch: function(req, res, next) {
    bookStrict(req)
    for(const p in req.body) req.book[p] = req.body[p]

    req.book.save(function(err) {
      handler(err, next, function() {
        res.send({
          status: 200,
          message: 'Book has updated',
          book: bookResponse(req.book)
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

// book response function
function bookResponse(book) {
  return {
    _id: book._id,
    title: book.title,
    author: {
      name: {
        first: book.author.name.first,
        last: book.author.name.last
      },
      email: book.author.email
    },
    read: book.read,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt
  }
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
  if(req.body._id) delete req.body._id
  if(req.body.title) req.body.title = startCase(toLower(req.body.title))
  if(req.body.createdAt) delete req.body.createdAt
  if(req.body.updatedAt) delete req.body.updatedAt
}
