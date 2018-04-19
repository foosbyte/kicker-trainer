const React = require('react');
const { Helmet } = require('react-helmet');
const { combineContexts, ReactContext } = require('hops-react');
const defaultTemplate = require('hops-react/lib/template');
const {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} = require('styled-components');

class StyledComponentsContext {
  constructor(options = {}) {
    this.theme = options.theme || {};
    this.template = options.template || defaultTemplate;
    this.sheet = new ServerStyleSheet();
  }

  enhanceElement(reactElement) {
    return React.createElement(
      StyleSheetManager,
      { sheet: this.sheet.instance },
      React.createElement(ThemeProvider, { theme: this.theme }, reactElement),
    );
  }

  renderTemplate(templateData) {
    const styles = this.sheet.getStyleTags();
    const helmet = Helmet.renderStatic();
    const helmetStyles = helmet.style.toString();
    helmet.style.toString = () => helmetStyles + styles;
    return this.template(Object.assign({ helmet }, templateData));
  }
}

module.exports.StyledComponentsContext = StyledComponentsContext;
module.exports.contextDefinition = StyledComponentsContext;
module.exports.createContext = combineContexts(
  ReactContext,
  StyledComponentsContext,
);
