const { Mixin } = require('hops');

class CustomMixin extends Mixin {
  configureBuild(webpackConfig, { allLoaderConfigs, jsLoaderConfig }, target) {
    // moment 2.x is seriously broken: https://github.com/moment/moment/issues/2979
    webpackConfig.resolve.alias['moment$'] = 'moment/moment.js';

    if (target === 'node') {
      // declare mobx as external to not have it evaluated multiple times in the
      // server bundle (happens on hot module reload on the server)
      webpackConfig.externals = Array.isArray(webpackConfig.externals)
        ? ['mobx', ...webpackConfig.externals]
        : typeof webpackConfig.externals !== 'undefined'
        ? ['mobx', webpackConfig.externals]
        : ['mobx'];
    }

    const untoolImportPluginIndex = jsLoaderConfig.options.plugins.findIndex(
      plugin =>
        require.resolve(Array.isArray(plugin) ? plugin[0] : plugin) ===
        require.resolve('@untool/react/lib/babel')
    );

    jsLoaderConfig.options.plugins.splice(untoolImportPluginIndex, 1, [
      require.resolve('./babel'),
      { module: '../patched-runtime' },
    ]);

    return webpackConfig;
  }
}

module.exports = CustomMixin;
