import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Button } from './components/button';
import { ScrollView } from './components/scroll-view';
import { Space } from './components/space';
import { TabBar, TabBarItem } from './components/tab-bar';
import { Text } from './components/text';
import { View } from './components/view';
import manifest from './manifest.webmanifest';
import { Scenes } from './scenes';
import { css } from './styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    font-size: ${theme.fontSize.m}px;
    background-color: ${theme.color.anthrazit};
    color: ${theme.color.white};
  }
  a, a:visited, a:hover, a:focus, a:active {
    text-decoration: none;
  }
`;

const Root = styled(View)`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const Content = styled(View)`
  display: flex;
  flex: 1 0 0;
  height: 1px;
`;

const Nav = styled(View)`
  flex: 0 0 auto;
`;

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataPrivacyLayer = styled.div<{ theme: typeof theme }>`
  background-color: ${props => props.theme.color.anthrazit};
  padding: 32px;
  display: flex;
  flex-direction: column;
  margin: ${props => css`0 ${props.theme.space.l}px`};
`;

interface AppProps extends RouteComponentProps<{}> {
  dataPrivacy?: import('./stores/data-privacty').DataPrivacy;
  analytics?: import('./stores/analytics').Analytics;
}

@inject('dataPrivacy', 'analytics')
@observer
class App extends React.Component<AppProps> {
  public componentDidUpdate(): void {
    this.props.analytics!.setLocation(this.props.location.pathname);
  }

  public componentDidCatch(error: Error): void {
    this.props.analytics!.trackException(error);
  }

  public render(): any {
    return (
      <Root>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Foosball trainer</title>
          <html lang="en" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href={manifest} />
          <meta name="theme-color" content="#000" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/jam-icons@2.0.0/css/jam.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Work+Sans"
            rel="stylesheet"
          />
        </Helmet>
        <GlobalStyle />
        <Content>
          <ScrollView>
            <Scenes location={this.props.location} />
          </ScrollView>
        </Content>
        <Nav>
          <TabBar>
            <TabBarItem icon="user-circle" title="Profile" to="/" />
            <TabBarItem
              icon="settings-alt"
              title="Categories"
              to="/categories"
            />
            <TabBarItem icon="bar-chart" title="Stats" to="/stats" />
          </TabBar>
        </Nav>
        {this.renderDataPrivacyAgreement()}
      </Root>
    );
  }

  private renderDataPrivacyAgreement(): JSX.Element | null {
    if (this.props.dataPrivacy!.accepted) {
      return null;
    }
    return (
      <Backdrop>
        <DataPrivacyLayer>
          <Space between="m">
            <Text>
              Diese Website verwendet Cookies für Analysen, personalisierte
              Inhalte und Werbung. Indem Sie diese Website nutzen, erklären Sie
              sich mit dieser Verwendung einverstanden.
            </Text>
            <Button onPress={this.acceptDataPrivacyAgreement} intent="default">
              Akzeptieren
            </Button>
          </Space>
        </DataPrivacyLayer>
      </Backdrop>
    );
  }

  @bind
  private acceptDataPrivacyAgreement(): void {
    this.props.dataPrivacy!.accept();
  }
}

export const RoutedApp = withRouter(App);
