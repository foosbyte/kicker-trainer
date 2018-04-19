const React = require('react');
const hopsReact = require('hops-react');
const mobxReact = require('mobx-react');

const { Provider } = mobxReact;

class MobXContext {
  constructor(options = {}) {
    const { stores } = options;
    this.stores = stores;
  }

  enhanceElement(reactElement) {
    return React.createElement(Provider, this.stores, reactElement);
  }
}

exports.MobXContext = MobXContext;
exports.contextDefinition = MobXContext;
exports.createContext = hopsReact.combineContexts(
  hopsReact.ReactContext,
  MobXContext
);
