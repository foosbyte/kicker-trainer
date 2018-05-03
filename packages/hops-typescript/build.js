const baseHopsConfig = require('hops-build-config/configs/build');
const typeScriptLoader = require('./typescript-loader');

baseHopsConfig.resolve.extensions = typeScriptLoader.resolve.extensions.concat(
  baseHopsConfig.resolve.extensions
);
baseHopsConfig.resolve.mainFields = baseHopsConfig.resolve.mainFields.filter(
  field => field !== 'jsnext:main'
);
baseHopsConfig.module.rules[0].oneOf.unshift(
  typeScriptLoader.module.rules[0].oneOf[0]
);

module.exports = baseHopsConfig;
