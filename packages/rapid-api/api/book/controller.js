import errHandle from 'rapid-error-handler'
import omit from 'lodash/omit'
import Book from './model'

class Ctrl {
  // get all items
  getAll(req, res, next) {
    let query = {}
    if(req.query.search) query = {title: new RegExp(Ctrl.escapeRegex(req.query.search), 'gi')}
    else if(req.query.read) query.read = req.query.read

    Book.find(query, function(err, books) {
      Ctrl.handler(err, next, function() {
        res.send({
          total: books.length,
          books: books.map(function(book) {
            let response = Ctrl.bookResponse(book)
            response.request = Ctrl.bookUrl(req, book)
            return response
          })
        })
      })
    })
  }

  // post new item
  post(req, res, next) {
    req.body = Ctrl.bookStrict(req.body)
    let book = new Book(req.body)
    let response = Ctrl.bookResponse(book)
    response.request = Ctrl.bookUrl(req, book)

    book.save(function(err) {
      Ctrl.handler(err, next, function() {
        res.status(201).send({
          status: 201,
          message: 'Book has added',
          book: response
        })
      })
    })
  }

  // find one item
  find(req, res, next) {
    Book.findById(req.params.id, function(err, book) {
      Ctrl.handler(err, next, function() {
        if(book) {
          req.book = book
          next()
        } else next(new errHandle.NotFound('Book not found'))
      })
    })
  }

  // get one item
  get(req, res) {
    let response = Ctrl.bookResponse(req.book)
    response.filterByRead = {
      type: 'GET',
      url: `http://${req.headers.host}/book?read=${response.read}`
    }
    res.send({book: response})
  }

  // patch an item
  patch(req, res, next) {
    req.body = Ctrl.bookStrict(req.body)
    for(let key in req.body) req.book[key] = req.body[key]

    req.book.save(function(err) {
      Ctrl.handler(err, next, function() {
        res.send({
          status: 200,
          message: 'Book has updated',
          book: Ctrl.bookResponse(req.book)
        })
      })
    })
  }

  // delete an item
  delete(req, res, next) {
    req.book.remove(function(err) {
      Ctrl.handler(err, next, function() {
        res.send({
          status: 200,
          message: 'Book has removed'
        })
      })
    })
  }

  // handler
  static handler(err, next, callback) {
    if(err) next(new errHandle.BadRequest(err))
    else callback()
  }

  // book response
  static bookResponse(book) {
    return {
      _id: book._id,
      title: book.title,
      author: book.author,
      read: book.read,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    }
  }

  // book url
  static bookUrl(req, book) {
    return {
      type: 'GET',
      url: `http://${req.headers.host}/book/${book._id}`
    }
  }

  // book strict
  static bookStrict(body) {
    return omit(body, ['_id', 'createdAt', 'updatedAt', '__v'])
  }

  // escape regex
  static escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }
}

export default new Ctrl
