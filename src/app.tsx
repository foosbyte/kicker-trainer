import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Miss, render } from 'hops-react';
import { createContext } from 'hops-styled-components';
import styled from 'styled-components';

import { Categories } from './scenes/categories';
import { Exercise } from './scenes/exercise';
import { Exercises } from './scenes/exercises';
import { Profile } from './scenes/profile';

const Root = styled.div`
  text-align: center;
  color: rebeccapurple;
`;

const App = (): JSX.Element => (
  <Root>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <nav>
      <Link to="/">Profile</Link>
      <Link to="/categories">Categories</Link>
    </nav>
    <Switch>
      <Route exact={true} path="/" component={Profile} />
      <Route exact={true} path="/categories" component={Categories} />
      <Route exact={true} path="/exercises/:category" component={Exercises} />
      <Route
        exact={true}
        path="/exercises/:category/:name"
        component={Exercise}
      />
      <Miss />
    </Switch>
  </Root>
);

export default render(<App />, createContext());
