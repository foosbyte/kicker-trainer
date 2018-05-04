import * as React from 'react';
import styled from 'styled-components';

import { Avatar } from '../components/avatar';
import { Button } from '../components/button';
import { RecentTrainings } from '../components/recent-trainings';
import { View } from '../components/view';

const ProfileWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Centered = styled(View)`
  align-self: center;
`;

export class Profile extends React.PureComponent {
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
      </ProfileWrapper>
    );
  }
}
