# ESLint Config Rapida
An extensible shared [Stylint](https://github.com/SimenB/stylint) configuration to lint Stylus code.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Usage
In your project folder, install `stylint-config-rapida` by running:
```
npm i stylint stylint-config-rapida --save-dev
```

Then in your `package.json`, specify the configuration using the `--config` flag in the `scripts` object:
```json
"scripts": {
  "stylint": "stylint ui --config node_modules/stylint-config-rapida/.stylintrc --color"
}
```

## License
Copyright (c) 2020 Nuotron.
Released under the [MIT license](https://github.com/github/choosealicense.com/blob/gh-pages/LICENSE.md).
