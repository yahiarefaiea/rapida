# Rapida REST

An abstraction helper for REST API that creates an abstract controller that communicate with database in a consistent way.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Usage
In your project folder, install `@rapida/rest` by running:
```
npm i @rapida/rest --save
```

Import `@rapida/rest` to your project:
```javascript
const express = require('express')
const mongoose = require('mongoose')
const AbstractController = require('@rapida/rest')
```

After setting up your express and mongoose connection, create a new instance of the `AbstractController` and pass a model to it:
```javascript
const app = express()
mongoose.connect('mongodb://localhost:27017/rapida-rest')

const Model = mongoose.model('Book', new mongoose.Schema({title: String, author: String}))
const controller = new AbstractController(Model)
```

Now, you have all the endpoints needed for you to use:
```javascript
app.get('/book', controller.getAll)
```

## Methods
The available methods are:
```javascript
const router = express.Router()

router.route('/')
  .get(controller.getAll)
  .post(controller.post)

router.route('/:id')
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.delete)
```

## Advanced Usage
You can extend the `AbstractController` to write or update a specific endpoint or the entire controller:
```javascript
// controller.js
import AbstractController from '@rapida/rest'
import Model from './model'

class Controller extends AbstractController {
  constructor(model) {
    super(model)
  }

  getAll(req, res, next) {
    // do something here before calling the super.getAll
    super.getAll(req, res, next)
  }
}

export default new Controller(Model)
```

And with this, you can use the controller now in your project:
```javascript
// anywhere.js
import controller from './controller'
const router = express.Router()

router.route('/')
  .get(controller.getAll)
  .post(controller.post)
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
