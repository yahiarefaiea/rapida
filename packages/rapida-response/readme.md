![Rapida Logo](https://user-images.githubusercontent.com/13030990/71755098-db251e80-2e91-11ea-8ce9-25349e6c087f.png)

**Rapida Response** - An abstraction helper that returns a consistent responses all around your RESTful API.

This package is part of [Rapida](https://github.com/YahiaRefaiea/rapida).

## Usage
In your project directory, install `@rapida/response` by running:
```
npm i @rapida/response --save
```

Import `@rapida/response` to your project:
```js
const response = require('@rapida/response')
```

Then create an new instance of the `response`, and send it to the client. You can do that with Express by:
```js
res.send(new response.NotFound())
```

## Methods
The available methods are:
```js
// data is required, default message: 'Resource(s) found', status: 200
new response.Found(data, message)

// data is required, default message: 'Resource created', status: 201
new response.Created(data, message)

// data is required, default message: 'Resource updated', status: 200
new response.Updated(data, message)

// default message: 'Resource deleted', status: 200
new response.Deleted(message)

// default message: 'Resource not found', status: 404
new response.NotFound(message)

// default message: 'Bad Request', status: 400
new response.BadRequest(message)

// default message: 'Action forbidden', status: 403
new response.Forbidden(message)

// default message: 'Unauthorized access', status: 401
new response.Unauthorized(message)

// default message: 'Internal server error', status: 500
new response.InternalServerError(message)
```

## The response object
When sending a response, you are expecting to receive a JSON object that looks like this:
```js
{
  data: { title: 'Book Title', author: 'Book Author' },
  message: 'Resource(s) found',
  status: 200
}
```

And if there is an error, then it will looks like this:
```js
{ status: 404 }
```

**Note**: You can expand the error by [setting a global error handler](#setting-a-global-error-handler-for-express).

## Advanced Usage
### The `Good` method
If you need to create a new custom response, you can use the `Good` method:
```js
new response.Good({'my': 'data'}, 'Custom response message', 1234)
```

### The `Bad` method
If you need to create a new custom error, you can use the `Bad` method:
```js
new response.Bad('Custom error message', 1234)
```

### The `response.defaults` object
Also, you might need to access the `response.defaults` object. When working with Express you might need it when setting a `res.status()`:
```js
res.status(response.defaults.Created.status).send(new response.Created(resource, response.defaults.Created.message))
```

### Setting a global error handler for Express
Express provides a great way to handle errors using the [next middleware](https://expressjs.com/en/guide/using-middleware.html):
```js
// server.js
const express = require('express')
const response = require('@rapida/response')
const api = require('./path/to/api')

const app = express()

app.use('/', api())

// error handler
app.use(function(err, req, res, next) {
  if(err && err.status)
    res.status(err.status).send(new response.Good(null, err.message, err.status))
  else next(err)
})

app.listen(3000)
```

Now anywhere in your project, you can create a response and pass it to the next middleware:
```js
const express = require('express')
const response = require('@rapida/response')
const router = express.Router()

const book = require('./path/to/book')

module.exports = function() {
  return router
    .use('/book', book())

    // error handler
    .use(function(req, res, next) {
      next(new response.Forbidden())
    })
}
```

## Demo
To run a working demo, run the following command:
```
npm start -s
```

You can find the demo inside `demo/index.js`.

## License
Copyright (c) 2020 Nuotron.
Released under the [MIT license](https://github.com/github/choosealicense.com/blob/gh-pages/LICENSE.md).
