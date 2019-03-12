const { Mixin } = require('hops');

class CustomMixin extends Mixin {
  configureBuild(webpackConfig, _, target) {
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

    return webpackConfig;
  }
}

module.exports = CustomMixin;
