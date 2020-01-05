![Rapida Logo](https://user-images.githubusercontent.com/13030990/71755098-db251e80-2e91-11ea-8ce9-25349e6c087f.png)

**Rapida API** - A starter-kit that creates an environment to help you focus on building a RESTful API.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Compatibility
The environment uses [babel](https://github.com/babel/babel) at its core. It also uses `node v12.14.0`.

## Usage
+ Clone this repository by running:
```
git clone https://github.com/nuotron/rapida.git
```

+ Create a copy of `rapida-api`, add a name for your project, and then change directory to it:
```
cp rapida/packages/rapida-api my-project -r && cd my-project
```

+ Create a new git repository by running the following commands (one after one):
```
git init
git add .
git commit -m 'initial commit'
```

+ Install the required dependencies listed in the `package.json`:
```
npm i
```

+ Now you can run the project by running:
```
npm start -s
```

**Note:** You need to have [MongoDB](https://docs.mongodb.com) service up and running on your machine in order to connect to the database.

## NPM Scripts
The available npm scripts are:

### start
The main script is `start` which will fire the [server script](#server). It also [watch](#watch) for files changes and run the necessary scripts for them:
```
npm start -s
```

### server
The `server` script fire the `bin/server.js` using [nodemon](https://github.com/remy/nodemon). Nodemon will reload the server on files changes which gives you a great development experience:
```
npm run server -s
```

The access URL for the demo will be `localhost:3000/book`. But you can change the `host` and `port` by [configuring your project](#configuring-your-project). You can see a demo from [here](#the-api-directory).

### server:prod
For production, the `server:prod` will be your script when deploying your project. The [Procfile](https://devcenter.heroku.com/articles/procfile) in the root of the project tells Heroku to run this script by default:
```
npm run server:prod
```

### test
To run your tests, run the `test` script. We use [mocha](https://mochajs.org) as our testing framework:
```
npm test -s
```

You need to add your test files inside the `api/` directory, also your files should end with a `.test.js`. You can see a demo from [here](#the-api-directory).

### lint
To lint your `.js` files, run the `lint` script. We use [eslint](https://github.com/eslint/eslint) as our linter and it looks for all the `.js` files inside your project.
```
npm run lint -s
```

The eslint is configured inside the `package.json` which it extends our [eslint-config-rapida](https://github.com/nuotron/rapida/tree/master/packages/eslint-config-rapida):
```json
"eslintConfig": {
  "root": true,
  "extends": "rapida"
}
```

### watch
The `watch` script will watch for all your `.test.js` and `.js` files and run the `test` and `lint` scripts when necessary:
```
npm run watch -s
```

The `watch` script uses the [npm-watch](https://github.com/M-Zuber/npm-watch). You can configure it by updating the `watch` object in the `package.json`.

## Configuring your project
The main file that runs everything is the `bin/server.js`. It uses [Express](https://github.com/expressjs/express) and [Mongoose](https://github.com/Automattic/mongoose) at its core. The `bin/server.js` is just the starting point, and in the end, it points to the `api/` directory which contains the logic for your project.

You can configure the project by updating the `bin/config.js` object used all around the project. You can view what it contains from [here](https://github.com/nuotron/rapida/blob/master/packages/rapida-api/bin/config.js).

## The API directory
The `api/` directory has a feature-based structure which it makes it more organized and easy to maintain even with larger projects. The `api/index.js` is the place where you load all of the features you have for your API. And each feature is contained within a dedicated directory that has its name. Check [this demo](https://github.com/nuotron/rapida/tree/master/packages/rapida-api/api/book).

## License
Copyright (c) 2020 Nuotron.
Released under the [MIT license](https://github.com/github/choosealicense.com/blob/gh-pages/LICENSE.md).
