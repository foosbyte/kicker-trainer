const React = require("react");
const hopsReact = require("hops-react");
const mobxReact = require("mobx-react");

const { Provider } = mobxReact;

const INITIAL_STATE = "INITIAL_STATE";

class MobXContext {
  constructor(options = {}) {
    const { RootState } = options;
    this.RootState = RootState;
    this.rootState = {};
    this.initialState = undefined;
  }

  bootstrap() {
    this.initialState = global[INITIAL_STATE];
  }

  getRootState() {
    if (!this.rootState) {
      this.rootState = new this.RootState(this.initialState);
    }
    return this.rootState;
  }

  enhanceElement(reactElement) {
    return ReactContext.createElement(
      Provider,
      this.getRootState(),
      reactElement
    );
  }

  getTemplateData(templateData) {
    return Object.assign({}, templateData, {
      globals: (templateData.globals || []).concat([
        {
          name: INITIAL_STATE,
          value: this.getRootState().toJS()
        }
      ])
    });
  }
}

exports.MobXContext = MobXContext;
exports.contextDefinition = MobXContext;
exports.createContext = hopsReact.combineContexts(
  hopsReact.ReactContext,
  MobXContext
);
