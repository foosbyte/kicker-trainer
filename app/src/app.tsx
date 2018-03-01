import installServiceWorker from 'hops-pwa';
import { Miss, render } from 'hops-react';
import { createContext } from 'hops-styled-components';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';

import { ScrollContainer } from './components/scroll-container';
import { TabBar, TabBarItem } from './components/tab-bar';
import { View } from './components/view';
import manifest from './manifest.webmanifest';
import { Categories } from './scenes/categories';
import { Exercise } from './scenes/exercise';
import { Exercises } from './scenes/exercises';
import { Profile } from './scenes/profile';
import { Stats } from './scenes/stats';
import { theme } from './theme';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    margin: 0;
  }
`;

installServiceWorker();

const Root = styled(View)`
  width: 100%;
  height: 100%;
  position: fixed;
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
      <link rel="manifest" href={manifest} />
      <meta name="theme-color" content="#000" />
    </Helmet>
    <Root>
      <Content>
        <ScrollContainer>
          <Switch>
            <Route exact path="/" component={Profile} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/exercises/:category" component={Exercises} />
            <Route
              exact
              path="/exercises/:category/:name"
              component={Exercise}
            />
            <Route exact path="/stats" component={Stats} />
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

export default render(
  <App />,
  createContext({
    theme,
  }),
);
