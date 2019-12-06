import mongoose from 'mongoose'

export default mongoose.model('Book', new mongoose.Schema({
  title: {
    type: String,
    maxlength: [48, 'title must be less than 48 characters'],
    required: [true, 'title must be provided'],
    unique: true
  },

  author: {
    type: String,
    maxlength: [48, 'author must be less than 48 characters'],
    required: [true, 'author must be provided']
  },

  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
}))
