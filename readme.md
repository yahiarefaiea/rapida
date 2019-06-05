# Rapid UI

Rapid JavaScript development environment for building UI.

**Note: To see a complete demo, please clone [this repo](https://github.com/nuotron/rapid-ui-demo).**

## Getting Started

Run `npm i` to install all the dependencies,
then `npm run serve -s` to serve the app for development,
or `npm run build -s` to build the app for production.

**Note: Browser will open instantly when serving the app for development**

## Todos:
1. Use webpack treeshaking.
2. Add configuration options file for webpack.
3. Hash all the copied files from `/static` using something like `file-loader` and `url-loader`.
4. Integrate browsersync with localtunnel.
5. Include http and mock api calls and generate mock data to `./data/db.json`.
6. Add @storybook/html ("storybook": "start-storybook -p 6006").
7. Add Flow config ("flow": "flow check").

## Issues:
1. Static files are not updated when `/static` is modified.
