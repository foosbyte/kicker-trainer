import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { RecentTrainings } from '../components/recent-trainings';
import { View } from '../components/view';
import { PWAIntegration } from '../stores/pwa';
import { ServiceWorker } from '../stores/service-worker';

const ProfileWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Centered = styled(View)`
  align-self: center;
`;

export interface ProfileProps {
  pwa: PWAIntegration;
  serviceWorker: ServiceWorker;
}

@inject('pwa', 'serviceWorker')
@observer
export class Profile extends React.Component<ProfileProps> {
  public render(): JSX.Element {
    return (
      <ProfileWrapper>
        <Centered>
          <Avatar size="normal" />
        </Centered>
        <RecentTrainings />
        <Centered>
          <Button to="/categories">Start Training</Button>
        </Centered>
        <Centered>
          <Button to="/settings">Settings</Button>
        </Centered>
        {this.props.pwa.installable && (
          <Centered>
            <Button onPress={this.installPwa}>Install on device</Button>
          </Centered>
        )}
        {this.props.serviceWorker.updateAvailable && (
          <Centered>
            <Button onPress={this.installUpdate}>Install new version</Button>
          </Centered>
        )}
      </ProfileWrapper>
    );
  }

  @bind
  private installPwa(): void {
    this.props.pwa.install();
  }

  @bind
  private installUpdate(): void {
    this.props.serviceWorker.install();
  }
}
