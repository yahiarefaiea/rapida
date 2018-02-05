import mongoose from 'mongoose'

// export function
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  read: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Book', bookSchema)
