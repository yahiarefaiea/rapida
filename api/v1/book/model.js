import mongoose from 'mongoose'

// export function
const bookModel = new mongoose.Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('book', bookModel)
