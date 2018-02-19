import mongoose from 'mongoose'

// export function
module.exports = mongoose.model('Book', new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title must be provided']
  },
  author: {
    type: String,
    required: [true, 'author must be provided']
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
}))
