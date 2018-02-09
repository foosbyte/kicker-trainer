import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Miss, render } from 'hops-react';
import { createContext } from 'hops-styled-components';
import styled from 'styled-components';

import { Home } from './home';

const Root = styled.div`
  text-align: center;
  color: rebeccapurple;
`;

const App = () => (
  <Root>
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Miss />
    </Switch>
  </Root>
);

export default render(<App />, createContext());
