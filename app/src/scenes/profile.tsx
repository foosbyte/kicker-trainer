import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { RecentTrainings } from '../components/recent-trainings';
import { View } from '../components/view';
import { PWAIntegration } from '../stores/pwa';

const ProfileWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Centered = styled(View)`
  align-self: center;
`;

@inject('pwa')
@observer
export class Profile extends React.Component<{ pwa: PWAIntegration }> {
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
      </ProfileWrapper>
    );
  }

  @bind
  private installPwa(): void {
    this.props.pwa.install();
  }
}
