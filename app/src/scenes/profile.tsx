import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import background from '../background@2x.png';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { Icon } from '../components/icon';
import { RecentTrainings } from '../components/recent-trainings';
import { Space } from '../components/space';
import { Text } from '../components/text';
import { View } from '../components/view';
import { PWAIntegration } from '../stores/pwa';
import { ServiceWorker } from '../stores/service-worker';
import styled, { css } from '../styled-components';

const UpdateButton = styled.button`
  text-decoration: initial;
  display: flex;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  border: 0;
  outline: 0;
  position: absolute;
  top: ${(props) =>
    css`
      ${props.theme.space.m * 1.5}px
    `};
  left: 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  align-items: center;
  padding: ${(props) =>
    css`0 ${props.theme.space.l}px 0 ${props.theme.space.s}px`};
  background-color: ${(props) => props.theme.color.blue};
  color: ${(props) => props.theme.color.white};
`;

const SettingsButton = styled(Link)`
  color: ${(props) => props.theme.color.white};
  position: absolute;
  top: 0;
  right: 0;
`;

const ProfileWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
`;

const ProfileHeader = styled(View)`
  overflow: hidden;
  position: relative;
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
    background-color: ${(props) => props.theme.color.green};
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

export const Profile = inject(
  'pwa',
  'serviceWorker'
)(
  observer(
    class Profile extends React.Component<ProfileProps> {
      public render(): JSX.Element {
        return (
          <ProfileWrapper>
            <ProfileHeader>
              <AvatarArc>
                <Avatar size="normal" />
              </AvatarArc>
              {this.props.serviceWorker.updateAvailable && (
                <UpdateButton onClick={this.installUpdate}>
                  <Icon icon="download" size={24} />
                  <Text>Update verfügbar. Klicke zum installieren.</Text>
                </UpdateButton>
              )}
              <SettingsButton to="/settings">
                <Space inset="m" stretch>
                  <Icon icon="cog" size={24} />
                </Space>
              </SettingsButton>
            </ProfileHeader>
            <RecentTrainings />
            <Space inset="xl">
              <Space between="m">
                <Button to="/categories">Start Training</Button>
                {this.props.pwa.installable && (
                  <Button onPress={this.installPwa}>Install on device</Button>
                )}
              </Space>
            </Space>
          </ProfileWrapper>
        );
      }

      installPwa = () => {
        this.props.pwa.install();
      };

      installUpdate = () => {
        this.props.serviceWorker.install();
      };
    }
  )
);
