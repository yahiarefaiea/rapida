import mongoose from 'mongoose'
import startCase from 'lodash/startCase'
import toLower from 'lodash/toLower'

// export function
module.exports = mongoose.model('Book', new mongoose.Schema({

  // title
  title: {
    type: String,
    maxlength: [48, 'title must be less than 48 characters'],
    required: [true, 'title must be provided'],
    unique: true,
    set: function(value) {
      return startCase(toLower(value))
    }
  },

  // author
  author: {
    type: String,
    maxlength: [48, 'author must be less than 48 characters'],
    required: [true, 'author must be provided'],
    set: function(value) {
      return startCase(toLower(value))
    }
  },

  // read
  read: {
    type: Boolean,
    default: false
  },

  // slug
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
}))
