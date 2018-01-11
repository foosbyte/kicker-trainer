import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { render, Miss } from 'hops-react';
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
      <Route exact path="/" component={Home} />
      <Miss />
    </Switch>
  </Root>
);

export default render(<App />, createContext());
