const baseHopsConfig = require('hops-build-config/configs/build');
const typeScriptLoader = require('./typescript-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

baseHopsConfig.resolve.extensions = typeScriptLoader.resolve.extensions.concat(
  baseHopsConfig.resolve.extensions
);
baseHopsConfig.resolve.mainFields = baseHopsConfig.resolve.mainFields.filter(
  field => field !== 'jsnext:main'
);
baseHopsConfig.module.rules[0].oneOf.unshift(
  typeScriptLoader.module.rules[0].oneOf[0]
);

const pluginIndex = baseHopsConfig.optimization.minimizer.findIndex(
  p => p instanceof UglifyJSPlugin
);

if (pluginIndex !== -1) {
  baseHopsConfig.optimization.minimizer.splice(
    pluginIndex,
    1,
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: { inline: 1 },
        output: { comments: false },
      },
    })
  );
}

module.exports = baseHopsConfig;
