class Err extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  BadRequest: class BadRequest extends Err {
    constructor(message = 'Bad Request') {
      super(message, 400);
    }
  },
  Unauthorized: class Unauthorized extends Err {
    constructor(message = 'Unauthorized Access') {
      super(message, 401);
    }
  },
  Forbidden: class Forbidden extends Err {
    constructor(message = 'Forbidden') {
      super(message, 403);
    }
  },
  NotFound: class NotFound extends Err {
    constructor(message = 'Not Found') {
      super(message, 404);
    }
  },
  InternalServerError: class InternalServerError extends Err {
    constructor(message = 'Internal Server Error') {
      super(message, 500);
    }
  }
}
