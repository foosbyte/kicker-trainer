import { Miss, render } from 'hops-react';
import { createContext } from 'hops-styled-components';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

import { ScrollContainer } from './components/scroll-container';
import { TabBar, TabBarItem } from './components/tab-bar';
import { View } from './components/view';
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

const Root = styled(View)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled(View)`
  display: flex;
  flex 1 0 0;
`;

const Nav = styled(View)`
  flex: 0 0 auto;
`;

const App = (): JSX.Element => (
  <>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
    <Root>
      <Content>
        <ScrollContainer>
          <Switch>
            <Route exact={true} path="/" component={Profile} />
            <Route exact={true} path="/categories" component={Categories} />
            <Route
              exact={true}
              path="/exercises/:category"
              component={Exercises}
            />
            <Route
              exact={true}
              path="/exercises/:category/:name"
              component={Exercise}
            />
            <Miss />
          </Switch>
        </ScrollContainer>
      </Content>
      <Nav>
        <TabBar>
          <TabBarItem title="Profile" to="/" />
          <TabBarItem title="Categories" to="/categories" />
          <TabBarItem title="Stats" to="/stats" />
        </TabBar>
      </Nav>
    </Root>
  </>
);

export default render(<App />, createContext());
