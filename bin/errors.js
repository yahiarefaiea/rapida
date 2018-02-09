class Err extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

class BadRequest extends Err {
  constructor() {
    super('Bad Request', 400)
  }
}

class Unauthorized extends Err {
  constructor() {
    super('Unauthorized Access', 401)
  }
}

class Forbidden extends Err {
  constructor() {
    super('Forbidden', 403)
  }
}

class NotFound extends Err {
  constructor() {
    super('Not Found', 404)
  }
}

class InternalServerError extends Err {
  constructor() {
    super('Internal Server Error', 500)
  }
}

module.exports = {
  Err,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError
}
