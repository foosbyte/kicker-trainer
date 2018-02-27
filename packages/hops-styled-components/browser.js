import React from 'react';
import { combineContexts, ReactContext } from 'hops-react';
import { ThemeProvider } from 'styled-components';

export class StyledComponentsContext {
  constructor(options = {}) {
    this.theme = options.theme || {};
  }

  enhanceElement(reactElement) {
    return React.createElement(
      ThemeProvider,
      { theme: this.theme },
      reactElement,
    );
  }
}

export const contextDefinition = StyledComponentsContext;
export const createContext = combineContexts(
  ReactContext,
  StyledComponentsContext,
);
