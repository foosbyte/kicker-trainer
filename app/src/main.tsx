import { render } from 'hops';
import * as React from 'react';
import { RoutedApp } from './app';
import * as stores from './stores';
import { theme } from './theme';

export default render(<RoutedApp />, {
  styled: { theme },
  mobx: { stores },
});
