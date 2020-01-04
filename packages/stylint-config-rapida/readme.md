![Rapida Logo](https://user-images.githubusercontent.com/13030990/71755098-db251e80-2e91-11ea-8ce9-25349e6c087f.png)

**Stylint Config Rapida** - An extensible shared [Stylint](https://github.com/SimenB/stylint) configuration to lint Stylus code.

This package is part of [Rapida](https://github.com/nuotron/rapida).

## Usage
In your project directory, install `stylint-config-rapida` by running:
```
npm i stylint stylint-config-rapida --save-dev
```

Then in your `package.json`, specify the configuration using the `--config` flag in the `scripts` object:
```json
"scripts": {
  "stylint": "stylint <path/to/directory> --config node_modules/stylint-config-rapida/.stylintrc --color"
}
```

While `<path/to/directory>` is the directory you want to lint.

## License
Copyright (c) 2020 Nuotron.
Released under the [MIT license](https://github.com/github/choosealicense.com/blob/gh-pages/LICENSE.md).
