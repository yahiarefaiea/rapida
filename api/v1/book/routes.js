import express from 'express'

// export function
const book = function() {
  const bookRouter = express.Router()



  // book routes
  // bookRouter.route('/')
  //   .get(function(req, res) {
  //     res.send('book')
  //   })



  return bookRouter
}

module.exports = book
