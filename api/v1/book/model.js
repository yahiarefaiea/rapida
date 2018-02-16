import mongoose from 'mongoose'

// export function
module.exports = mongoose.model('Book', new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
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
