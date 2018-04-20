import { observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { ScrollView } from './components/scroll-view';
import { TabBar, TabBarItem } from './components/tab-bar';
import { View } from './components/view';
import manifest from './manifest.webmanifest';
import { Scenes } from './scenes';

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

@withRouter
@observer
export class App extends React.Component<any> {
  public render(): any {
    return (
      <Root>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href={manifest} />
          <meta name="theme-color" content="#000" />
        </Helmet>
        <Content>
          <ScrollView>
            <Scenes location={this.props.location} />
          </ScrollView>
        </Content>
        <Nav>
          <TabBar>
            <TabBarItem title="Profile" to="/" />
            <TabBarItem title="Categories" to="/categories" />
            <TabBarItem title="Stats" to="/stats" />
          </TabBar>
        </Nav>
      </Root>
    );
  }
}
