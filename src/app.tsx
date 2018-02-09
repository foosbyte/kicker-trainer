import { Miss, render } from 'hops-react';
import { createContext } from 'hops-styled-components';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

import { Layout } from './components/layout';
import { TabBar, TabBarItem } from './components/tab-bar';

import { Categories } from './scenes/categories';
import { Exercise } from './scenes/exercise';
import { Exercises } from './scenes/exercises';
import { Profile } from './scenes/profile';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    margin: 0;
  }
`;

const Root = styled(Layout)`
  height: 100vh;
`;

const App = (): JSX.Element => (
  <>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Root type="content-bottom" direction="column">
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
      <TabBar>
        <TabBarItem title="Profile" to="/" />
        <TabBarItem title="Categories" to="/categories" />
        <TabBarItem title="Stats" to="/stats" />
      </TabBar>
    </Root>
  </>
);

export default render(<App />, createContext());
