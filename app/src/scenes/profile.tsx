import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import background from '../background@2x.png';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { RecentTrainings } from '../components/recent-trainings';
import { Space } from '../components/space';
import { View } from '../components/view';
import { PWAIntegration } from '../stores/pwa';
import { ServiceWorker } from '../stores/service-worker';
import styled from '../styled-components';

const ProfileWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
`;

const avatarVars = {
  width: 29,
  height: 29,
  arcWidth: 125,
  arcHeight: 125,
};

const AvatarArc = styled(View)`
  position: relative;
  width: ${avatarVars.width}vw;
  height: ${avatarVars.height}vw;
  margin: 0 auto calc(45vh - ${avatarVars.height}vw) auto;

  ::before {
    content: ' ';
    border-radius: 50%;
    background-color: ${props => props.theme.color.green};
    position: absolute;
    width: ${avatarVars.arcWidth}vw;
    height: ${avatarVars.arcHeight}vw;
    top: -75vw;
    left: calc(-${avatarVars.arcWidth / 2}vw + ${avatarVars.width / 2}vw);
  }
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
        <AvatarArc>
          <Avatar size="normal" />
        </AvatarArc>
        <RecentTrainings />
        <Space inset="xl">
          <Space between="m">
            <Button to="/categories">Start Training</Button>
            <Button to="/settings">Settings</Button>
            {this.props.pwa.installable && (
              <Button onPress={this.installPwa}>Install on device</Button>
            )}
            {this.props.serviceWorker.updateAvailable && (
              <Button onPress={this.installUpdate}>Install new version</Button>
            )}
          </Space>
        </Space>
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
