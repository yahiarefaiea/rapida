import mongoose from 'mongoose'

// export function
module.exports = mongoose.model('Author', new mongoose.Schema({
  name: {
    first: {
      type: String
    },
    last: {
      type: String
    }
  },
  username: {
    type: String
  },
  email: {
    type: String
  }
}, {
  timestamps: true
}))
