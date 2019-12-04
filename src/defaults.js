module.exports = Object.freeze({
  Found: {
    status: 200,
    message: 'Resource(s) found'
  },
  Created: {
    status: 201,
    message: 'Resource created'
  },
  Updated: {
    status: 200,
    message: 'Resource updated'
  },
  Deleted: {
    status: 200,
    message: 'Resource deleted'
  },
  NotFound: {
    status: 404,
    message: 'Resource not found'
  },
  BadRequest: {
    status: 400,
    message: 'Bad Request'
  },
  Forbidden: {
    status: 403,
    message: 'Action forbidden'
  },
  Unauthorized: {
    status: 401,
    message: 'Unauthorized access'
  },
  InternalServerError: {
    status: 500,
    message: 'Internal server error'
  }
})
