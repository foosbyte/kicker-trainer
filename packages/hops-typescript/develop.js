const baseHopsConfig = require('hops-build-config/configs/develop');
const typeScriptLoader = require('./typescript-loader');

baseHopsConfig.resolve.extensions = typeScriptLoader.resolve.extensions.concat(
  baseHopsConfig.resolve.extensions,
);
baseHopsConfig.module.rules[0].oneOf.unshift(
  typeScriptLoader.module.rules[0].oneOf[0],
);

module.exports = baseHopsConfig;
