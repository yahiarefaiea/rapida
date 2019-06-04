# Rapid UI

Rapid JavaScript development environment for building UI.

## Getting Started

Run `npm i`,
then `npm run serve -s` to serve the app for development,
or `npm run build -s` to build the app for production.

## Todos:
1. Add a deploy script.
2. Add treeshaking to webpack.
3. Hashing all the copied files from static using something like `file-loader` and `url-loader`.
4. Add @storybook/html ("storybook": "start-storybook -p 6006").
5. Add Flow config ("flow": "flow check").
6. Integrate browsersync with localtunnel.
7. Use `const timestamp = new Date() // timestamp or timestamps?` in the `webpack.config.prod.js`.
8. Include http and mock api calls and generate mock data to `./data/db.json`.
9. Add configuration options file for webpack.

## Issues:
1. Static files are not updated when modified.
