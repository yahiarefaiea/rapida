const defaults = require('./defaults')

class Good {
  constructor(data = null, message, status) {
    if(data) this.data = data
    this.message = message
    this.status = status

    return this
  }
}

class Bad extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

module.exports = {
  defaults,
  Good,
  Bad,

  // data is required, default message: 'Resource(s) found', status: 200
  Found: class Found extends Good {
    constructor(data, message = defaults.Found.message) {
      super(data, message, defaults.Found.status)
    }
  },

  // data is required, default message: 'Resource created', status: 201
  Created: class Created extends Good {
    constructor(data, message = defaults.Created.message) {
      super(data, message, defaults.Created.status)
    }
  },

  // data is required, default message: 'Resource updated', status: 200
  Updated: class Updated extends Good {
    constructor(data, message = defaults.Updated.message) {
      super(data, message, defaults.Updated.status)
    }
  },

  // default message: 'Resource deleted', status: 200
  Deleted: class Deleted extends Good {
    constructor(message = defaults.Deleted.message) {
      super(null, message, defaults.Deleted.status)
    }
  },

  // default message: 'Resource not found', status: 404
  NotFound: class NotFound extends Bad {
    constructor(message = defaults.NotFound.message) {
      super(message, defaults.NotFound.status)
    }
  },

  // default message: 'Bad Request', status: 400
  BadRequest: class BadRequest extends Bad {
    constructor(message = defaults.BadRequest.message) {
      super(message, defaults.BadRequest.status)
    }
  },

  // default message: 'Action forbidden', status: 403
  Forbidden: class Forbidden extends Bad {
    constructor(message = defaults.Forbidden.message) {
      super(message, defaults.Forbidden.status)
    }
  },

  // default message: 'Unauthorized access', status: 401
  Unauthorized: class Unauthorized extends Bad {
    constructor(message = defaults.Unauthorized.message) {
      super(message, defaults.Unauthorized.status)
    }
  },

  // default message: 'Internal server error', status: 500
  InternalServerError: class InternalServerError extends Bad {
    constructor(message = defaults.InternalServerError.message) {
      super(message, defaults.InternalServerError.status)
    }
  }
}
