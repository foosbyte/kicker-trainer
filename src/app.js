import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { render, Miss, createContext } from 'hops-react';

import { Home } from './home';

const App = () => (
  <div>
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <Switch>
      <Route exact path="/" component={Home} />
      <Miss />
    </Switch>
  </div>
);

export default render(<App />, createContext());
