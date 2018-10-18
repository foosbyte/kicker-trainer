import { render } from 'hops-react';
import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { RoutedApp } from './app';
import * as stores from './stores';
import { theme } from './theme';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    font-size: ${theme.fontSize.m}px;
  }
`;

export default render(<RoutedApp />, {
  styled: { theme },
  mobx: { stores },
});
