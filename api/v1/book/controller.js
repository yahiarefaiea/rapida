import errHandle from 'rapid-error-handler'
import Book from './model'

// export function
module.exports = {
  // get all items
  getAll: function(req, res, next) {
  },

  // post new item
  post: function(req, res, next) {
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
function handler(err, next, callback) {
  if(err) next(new errHandle.BadRequest(err))
  else callback()
}
