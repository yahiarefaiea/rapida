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
    bookStrict(req.body)
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
    bookStrict(req.body)
    for(const key in req.body) req.book[key] = req.body[key]

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
  if(req._id) delete req._id
  if(req.title) req.title = startCase(toLower(req.title))
  if(req.author) {
    if(req.author.name) {
      if(req.author.name.first) req.author.name.first = startCase(toLower(req.author.name.first))
      if(req.author.name.last) req.author.name.last = startCase(toLower(req.author.name.last))
    }
    if(req.author.email) req.author.email = toLower(req.author.email)
  }
  if(req.createdAt) delete req.createdAt
  if(req.updatedAt) delete req.updatedAt
}
