# IgnoreNotFoundExportPlugin

## Instalation

`yarn add --dev ignore-not-found-export-plugin`

## Usage

```js
// webpack.config.js

const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-plugin')

module.exports = {
  ...,
  plugins: [
    new IgnoreNotFoundExportPlugin(['MyFirstInterface, MySecondInterface']),
    ...,
  ],
}
```