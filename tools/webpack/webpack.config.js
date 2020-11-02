const devConfig = require('./webpack-dev-config');
const prodConfig = require('./webpack-prod-config');
const commonConfig = require('./webpack-comon-config');
const merge = require("webpack-merge");

let config = commonConfig;

if (process.env.NODE_ENV === 'production') {
  config = merge(config,prodConfig)
} else {
  config = merge(config, devConfig)
}
module.exports = config;