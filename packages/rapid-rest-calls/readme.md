# Rapid REST Calls

Rapid REST calls helper for building UI.

## Usage

In your project folder, find and install `rapid-rest-calls`

Import `rapid-rest-calls` to your project:

```javascript
import Api from 'rapid-rest-calls'
```

Then create an new instance of the `Api`, and use it to create a new entity:

```javascript
const api = new Api({ url: 'http://localhost:3000' })
api.createEntity({ name: 'resource' })
```

And then you can use it in your app by calling the next methods:

```javascript
api.endpoints.resource.getAll(params = {}, config = {})

api.endpoints.resource.post(payload, config = {})

api.endpoints.resource.get(id, config = {})

api.endpoints.resource.patch(id, payload, config = {})

api.endpoints.resource.delete(id, config = {})
```

## What happens behind the scene?

We use `axios` to excite the http calls which's a promise based HTTP client

## How to use the response and catch the errors?

You can chain the `then` and the `catch` keywords after calling the methods:

For example:

```javascript
api.endpoints.resource.getAll()
.then(data => console.log(data))
.catch(error => console.log(error))
```
