export default Object.freeze({
  found: {
    status: 200,
    message: 'Resource(s) found'
  },
  created: {
    status: 201,
    message: 'Resource created'
  },
  updated: {
    status: 200,
    message: 'Resource updated'
  },
  deleted: {
    status: 200,
    message: 'Resource deleted'
  },
  notFound: {
    status: 404,
    message: 'Resource not found'
  },
  badRequest: {
    status: 400,
    message: 'Bad Request'
  },
  forbidden: {
    status: 403,
    message: 'Action forbidden'
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized access'
  },
  internalServerError: {
    status: 500,
    message: 'Internal server error'
  },
  noContent: {
    status: 204,
    message: 'No content'
  }
})
