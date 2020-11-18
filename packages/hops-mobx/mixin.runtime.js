const { Mixin } = require('hops');
const React = require('react');
const { Provider, enableStaticRendering } = require('mobx-react');
const { configure } = require('mobx');

enableStaticRendering(true);

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
