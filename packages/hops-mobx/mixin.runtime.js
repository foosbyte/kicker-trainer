const { Mixin } = require('hops-mixin');
const React = require('react');
const { Provider } = require('mobx-react');
const { configure } = require('mobx');

configure({
  enforceActions: 'observed',
});

class MobxMixin extends Mixin {
  constructor(config, element, { mobx: options = {} } = {}) {
    super(config);
    this.stores = options.stores;
  }
  enhanceElement(reactElement) {
    return <Provider {...this.stores}>{reactElement}</Provider>;
  }
}

module.exports = MobxMixin;
