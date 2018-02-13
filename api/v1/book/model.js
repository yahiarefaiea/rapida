import mongoose from 'mongoose'

// export function
module.exports = mongoose.model('Book', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}))
