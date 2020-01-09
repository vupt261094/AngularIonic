/*
* This configuration file is for extending ionic configuration file.
* */
const defaultConfiguration = require('../node_modules/@ionic/app-scripts/config/webpack.config');
const webpack = require('webpack');

let dev = defaultConfiguration.dev;
let prod = defaultConfiguration.prod;

//#region typeorm (dev)

dev.plugins.push(new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
  result.request = result.request.replace(/typeorm/, "typeorm/browser");
}));

dev.plugins.push(
  new webpack.ProvidePlugin({
    'window.SQL': 'sql.js/js/sql.js'
  })
);

//#endregion

//#region typeorm (prod)

prod.plugins.push(new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
  result.request = result.request.replace(/typeorm/, "typeorm/browser");
}));

//#endregion

console.log(defaultConfiguration.dev.plugins);
module.exports = defaultConfiguration;
