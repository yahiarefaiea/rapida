import mongoose from 'mongoose'

// export function
module.exports = mongoose.model('Book', new mongoose.Schema({
  title: {
    type: String,
    maxlength: [48, 'title must be less than 48 characters'],
    required: [true, 'title must be provided']
  },
  author: {
    name: {
      first: {
        type: String,
        maxlength: [18, 'first name must be less than 18 characters'],
        required: [true, 'first name must be provided']
      },
      last: {
        type: String,
        maxlength: [18, 'last name must be less than 18 characters'],
        required: [true, 'last name must be provided']
      }
    },
    email: {
      type: String,
      unique: [true, 'email already exists'],
      required: [true, 'email must be provided'],
      validate: {
        validator: function(email) {
          const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return regex.test(email)
        },
        message: 'this is not a valid email'
      }
    }
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
}))
