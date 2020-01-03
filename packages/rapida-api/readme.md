# Rapida API

A starter-kit that creates an environment for you to help you focus on creating a RESTful API.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Compatibility
The environment uses [babel](https://github.com/babel/babel) at its core. It also uses `node v12.14.0`.

## Usage
In your project folder, install `@rapida/cli` by running:
```
npm i @rapida/cli -g
```

Now you can create a new project by running:
```
rapida create api 'new-project'
```

Now you can navigate to your `new-project` by:
```
cd new-project
```

Create a new repository by running the following commands:
```
git init
git add .
git commit -m 'init commit'
```

Install the required dependencies listed in the `package.json` by running:
```
npm i
```

You can run the project by running:
```
npm start -s
```

**Note:** You need to have [MongoDB](https://docs.mongodb.com/) service up and running on your machine.

## NPM Scripts
The available npm scripts are:

### start
The main script is `start` which will fire the `server` script. It also `watch` for files changes and run the necessary script for it:
```
npm start -s
```

### server
The `server` script fire the `bin/server.js` using [nodemon](https://github.com/remy/nodemon):
```
npm run server -s
```

The access URL will be: `localhost:3000/book`. But you can change the `host` and `port` by [Configuring your project](#configure-your-project).

### server:prod
For production, the `server:prod` will be your script when deploying your project. You will also find a [Procfile](https://devcenter.heroku.com/articles/procfile) in the root which tells Heroku to run this script:
```
npm run server:prod
```

### test
To run your tests, run the `test` script. We use `mocha` as our test framework:
```
npm test -s
```

You need to add your test files inside the `api/` directory, also your files should end with a `.test.js`.

### lint
To lint your `.js` files, run the `lint` script. We use `eslint` as our linter.
```
npm run lint -s
```

The eslint is configured inside the `package.json` which it extends our [eslint-config-rapida](https://github.com/nuotron/rapida/tree/master/packages/eslint-config-rapida):
```
"eslintConfig": {
  "root": true,
  "extends": "rapida"
}
```

### watch
The `watch` script will watch for all your `.js` and `.test.js` files and run the required script when necessary:
```
npm run watch -s
```

The `watch` scripts uses the [npm-watch](https://github.com/M-Zuber/npm-watch). You can configure it by updating the `watch` object in the `package.json`.

## Configure your project
The main file that runs everything is the `bin/server.js`. It uses [Express](https://github.com/expressjs/express) and [Mongoose](https://github.com/Automattic/mongoose) at its core. The `bin/server.js` is just the starting point, and at the end it points to the `api/` folder which controls the project.

You can configure the project by setting the `bin/config.js` object used all around the project. You can view what it contains from [here](https://github.com/nuotron/rapida/blob/master/packages/rapida-api/bin/config.js).

## The API folder
The API folder has feature-based structure which it makes it organized and easy to maintain even with larger projects. The `api/index.js` is the place where you load all of the features you have for your API. And each feature is contained within a dedicated folder that has its name. Check [this example](https://github.com/nuotron/rapida/tree/master/packages/rapida-api/api/book).
