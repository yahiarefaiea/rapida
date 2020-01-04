![Rapida Logo](https://user-images.githubusercontent.com/13030990/71755098-db251e80-2e91-11ea-8ce9-25349e6c087f.png)

**Rapida REST Calls** - An abstraction helper for http calls that returns api endpoints for each entity you create in a consistent way.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Usage
In your project directory, install `@rapida/rest-calls` by running:
```
npm i @rapida/rest-calls --save
```

Import `@rapida/rest-calls` to your project:
```js
const Api = require('@rapida/rest-calls')
```

Then create a new instance of the `Api`, and use it to create a new entity:
```js
const api = new Api('http://localhost:3000')

// you can create one entity
api.createEntity('book')

// or multiple entities
api.createEntities(['book', 'author'])
```

And then you can use it in your app. Let's do a `getAll` method:
```js
api.endpoints.book.getAll()
```

To handle the response and catch the errors, you can chain the `then` and the `catch` keywords after calling the method:
```js
api.endpoints.book.getAll()
  .then(data => console.log(data))
  .catch(error => console.log(error))
```

## Methods
The available methods are:
```js
// default params: {}, default config: {}
api.endpoints.book.getAll(params, config)

// payload is required, default config: {}
api.endpoints.book.post(payload, config)

// id is required, default config: {}
api.endpoints.book.get(id, config)

// id is required, payload is required, default config: {}
api.endpoints.book.patch(id, payload, config)

// id is required, default config: {}
api.endpoints.book.delete(id, config)
```

## Advanced Usage
You can create an abstract api and use it all around your project by creating a file called `api.js` that contains the following:
```js
// api.js
const Api = require('@rapida/rest-calls')

const api = new Api('http://localhost:3000')
api.createEntities(['book', 'author'])

module.exports = api.endpoints
```

And with this, you will have a shorter and more self-descriptive constant to use anywhere in your project:
```js
// anywhere.js
const api = require('./path/to/api')

api.book.getAll()
```

## Demo
To run a working demo, run the following command:
```
npm start -s
```

You can find the demo inside `demo/index.js`.

## What happens behind the scene?
We use [axios](https://github.com/axios/axios) behind the scene to excite the http calls which's a promise based HTTP client.

## License
Copyright (c) 2020 Nuotron.
Released under the [MIT license](https://github.com/github/choosealicense.com/blob/gh-pages/LICENSE.md).
