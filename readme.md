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
4. Improve caching (hash, chunk hash, or content hash?).
5. Add @storybook/html ("storybook": "start-storybook -p 6006").
6. Add Flow config ("flow": "flow check").
7. Integrate browsersync with localtunnel.
8. add testing stuff and test config like reporter into the bin folder instead of scripts.
9. Use `const timestamp = new Date() // timestamp or timestamps?` in the `webpack.config.prod.js`.

## Issues:
1. Static files are not updated when modified.
