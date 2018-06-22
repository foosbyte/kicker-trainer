import { MobXContext } from 'hops-mobx';
import installServiceWorker from 'hops-pwa';
import { combineContexts, ReactContext, render } from 'hops-react';
import { StyledComponentsContext } from 'hops-styled-components';
import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { RoutedApp } from './app';
import * as stores from './stores';
import { theme } from './theme';

const createContext = combineContexts(
  ReactContext,
  MobXContext,
  StyledComponentsContext
);

installServiceWorker();

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    margin: 0;
  }
`;

export default render(<RoutedApp />, createContext({ theme, stores }));
