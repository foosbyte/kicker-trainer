import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataPrivacyLayer = styled.div`
  background-color: white;
  padding: 32px;
  display: flex;
  flex-direction: column;
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
          <label>
            <input id="data-privacy" type="checkbox" defaultChecked={false} />
            GDPR (Tracking with Google Analytics)
          </label>
          <button onClick={this.acceptDataPrivacyAgreement}>Accept</button>
        </DataPrivacyLayer>
      </Backdrop>
    );
  }

  @bind
  private acceptDataPrivacyAgreement(): void {
    const checkbox = document.getElementById(
      'data-privacy'
    ) as HTMLInputElement;
    if (checkbox.checked) {
      this.props.dataPrivacy!.accept();
    }
  }
}

export const RoutedApp = withRouter(App);
