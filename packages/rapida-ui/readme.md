![Rapida Logo](https://user-images.githubusercontent.com/13030990/71755098-db251e80-2e91-11ea-8ce9-25349e6c087f.png)

**Rapida UI** - A starter-kit that creates an environment to help you focus on building UI.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Compatibility
The environment uses [babel](https://github.com/babel/babel) at its core. It also uses `node v12.14.0`.

## Usage
+ Clone this repository by running:
```
git clone https://github.com/nuotron/rapida.git
```

+ Create a copy of `rapida-ui`, add a name for your project, and then change directory to it:
```
cp rapida/packages/rapida-ui my-project -r && cd my-project
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
npm run serve -s
```

## NPM Scripts
The available npm scripts are:

### serve
The main script is `serve` which will fire the [server script](#server). It also [watch](#watch) for files changes and run the necessary scripts for them:
```
npm run serve -s
```

### server
The `server` script fire the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) configured in the `bin/webpack.config.dev.babel.js`. Check the [webpack.config.dev.babel.js](#webpackconfigdevbabeljs) for more details:
```
npm run server -s
```

Browser will open instantly when serving the app for development. The access URL for the demo will be `localhost:8080`. But you can change the `host` and `port` by [configuring your project](#configuring-your-project).

### build
For production, the `build` will be your script when deploying your project. It's configured in the `bin/webpack.config.prod.babel.js`. And it will build all of your assets into a directory called `./dist`:
```
npm run build
```

**Note**: Before running the `build` script, npm runs the [clean script](#clean). It's specified by the `pre` prefix (`prebuild`) as a convention to run scripts by default before running a script.

### test
To run your tests, run the `test` script. We use [mocha](https://mochajs.org) as our testing framework:
```
npm test -s
```

You need to add your test files inside the `ui/` directory, also your files should end with a `.test.js`. You can see a demo in the `ui/components/atoms/nuotron/`.

### eslint
To lint your `.js` files, run the `eslint` script. We use [eslint](https://github.com/eslint/eslint) as our linter and it looks for all the `.js` files inside your project.
```
npm run eslint -s
```

The eslint is configured inside the `package.json` which it extends our [eslint-config-rapida](https://github.com/nuotron/rapida/tree/master/packages/eslint-config-rapida):
```json
"eslintConfig": {
  "root": true,
  "extends": "rapida"
}
```

### puglint
To lint your `.pug` files, run the `puglint` script. We use [pug-lint](https://github.com/pugjs/pug-lint) as our linter and it looks for all the `.pug` files inside the `ui/` directory.
```
npm run puglint -s
```

The puglint is configured inside the `package.json` which it extends our [pug-lint-config-rapida](https://github.com/nuotron/rapida/tree/master/packages/pug-lint-config-rapida):
```json
"pugLintConfig": {
  "extends": "rapida"
}
```

### stylint
To lint your `.styl` files, run the `stylint` script. We use [stylint](https://github.com/SimenB/stylint) as our linter and it looks for all the `.styl` files inside the `ui/` directory.
```
npm run stylint -s
```

The stylint is configured inside the `package.json` which it extends our [stylint-config-rapida](https://github.com/nuotron/rapida/tree/master/packages/stylint-config-rapida):
```json
"scripts": {
  "stylint": "stylint ui --config node_modules/stylint-config-rapida/.stylintrc --color"
}
```

### generate-mock
The `generate-mock` script will generate a mock data into `data/db.json`. This data can be served automatically when running the [serve-mock script](#serve-mock):
```
npm run generate-mock -s
```

The `generate-mock` script uses the [JSON Schema Faker](https://github.com/json-schema-faker/json-schema-faker). You can configure the model you want to generate by updating the `ui/mockModel.js`. The JavaScript file that generates the mock is located under the `bin/generateMock.js`.

### serve-mock
The `serve-mock` script fire the [json-server](https://github.com/typicode/json-server) which it looks for the [generated mock data](#generate-mock) and serve them on port 8081:
```
npm run serve-mock -s
```

Before running the `serve-mock` script, npm runs the [generate-mock script](#generate-mock). It's specified by the `pre` prefix (`preserve-mock`) as a convention to run scripts by default before running a script.

You can easily switch between the `mock api` and the `real api` specified in the `bin/config.js` by adding a `?useMockApi` as query parameter at the end of your URL. (For example: `localhost:8080/?useMockApi`)

### watch
The `watch` script will watch for all your `.test.js`, `.js`, `.pug`, `.styl`, and the `ui/mockModel.js` files and run the `test`, `eslint`, `puglint`, `stylint`, `serve-mock` scripts when necessary:
```
npm run watch -s
```

The `watch` scripts uses the [npm-watch](https://github.com/M-Zuber/npm-watch). You can configure it by updating the `watch` object in the `package.json`.

### clean
The `clean` script will clean your generated files and directories (`./dist` and `./data`):
```
npm run clean -s
```

## Configuring your project
The main file that runs everything for development is the `bin/webpack.config.dev.babel.js`, and for production is the `bin/webpack.config.prod.babel.js`. It uses [Webpack](https://github.com/webpack/webpack) as a JavaScript bundler at its core. But, it's just the starting point, and in the end, it points to the `ui/` directory which contains the logic for your project. Check the [Configuring Webpack](#configuring-webpack) section to see how everything works together.

You can configure the project by updating the `bin/config.js` object used all around the project. You can view what it contains from [here](https://github.com/nuotron/rapida/blob/master/packages/rapida-ui/bin/config.js).

## Configuring Webpack
There are 3 files to configure [Webpack](https://github.com/webpack/webpack) in the `bin/` directory:

### webpack.config.base.js
It's where the base configurations are set for both the `development` and `production`. They both share the configurations by using the [webpack-merge](https://github.com/survivejs/webpack-merge).

In the `webpack.config.base.js`, we specify the entry point which's `./ui/index.js`, and the output will be bundled in the `./dist`. The file name for the output will be `[name].bundle.extension` for the development, and `[name].bundle.[contenthash].extension` for the production which will help us with [caching](https://webpack.js.org/guides/caching).

We also split the `.js` bundles to `main`, `runtime`, and `vendors` which will also help us with caching and page load.

#### Plugins
We're using:
```js
// Inject all the necessary tags into the `ui/index.pug` template.
new HtmlWebpackPlugin()

// Extracts the CSS files out of the JS bundle
new MiniCssExtractPlugin()

// Generates Favicons for all browsers
new FaviconsWebpackPlugin()

// Copy the `static/` directory to the `./dist`
new CopyPlugin()

// Minify the images
new ImageminPlugin()
```

#### Loaders
We're using:
+ [babel-loader](https://github.com/babel/babel-loader)
+ [pug-html-loader](https://github.com/willyelm/pug-html-loader)
+ [stylus-loader](https://github.com/shama/stylus-loader)

### webpack.config.dev.babel.js
It's where the `development` configurations are set (merged with the `webpack.config.base.js`). It provides live reloading and [hot module replacement](https://webpack.js.org/guides/hot-module-replacement) on files changes. Also [BrowserSync](https://github.com/BrowserSync/browser-sync) is configured to reload all the files `webpack-dev-server` can't handle (Like `.pug` files) which gives you a great development experience.

### webpack.config.prod.babel.js
It's where the `production` configurations are set (merged with the `webpack.config.base.js`). It minify your JavaScript and CSS assets, generate a `sitemap.xml` and `robots.txt`, and add a banner for the generated bundles.

**Note**: You can configure these options from the `bin/config.js`.

## The UI directory
The `ui/` directory is structured based on the [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2) (atoms, molecules, organisms, templates, and pages) which it makes it more organized and easy to maintain even with larger projects. The `ui/index.js` is the place where you load all of your components. And each component is contained within a dedicated directory that has its name. Check [this demo](https://github.com/nuotron/rapida/tree/master/packages/rapida-ui/ui).

## The static directory
The `static/` directory is where you put all of your assets. The static directory is copied as it is to the `dist/`.

**Note**: The images in the static directory will be minified.

## Deploy
When your project is ready for production, we recommend using [surge](http://surge.sh) to deploy your project. You can set the URL you want your website to be published to by changing the `CNAME` file in your root directory.

To deploy, install `surge` globally on your machine:
```
npm i -g surge
```

And then deploy the `./dist` directory:
```
surge ./dist
```

**Note**: Surge might ask you to create an account if this is the first time you use it.

## License
Copyright (c) 2020 Nuotron.
Released under the [MIT license](https://github.com/github/choosealicense.com/blob/gh-pages/LICENSE.md).
