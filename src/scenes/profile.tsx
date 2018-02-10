import * as React from 'react';
import styled from 'styled-components';

import { Avatar } from '../components/avatar';
import { Badge } from '../components/badge';
import { View } from '../components/view';

const ProfileWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Centered = styled(View)`
  align-self: center;
`;

const LeftRight = styled(View)`
  display: flex;
  justify-content: space-between;
`;

export class Profile extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ProfileWrapper>
        <Centered>
          <Avatar size="normal" />
        </Centered>
        <LeftRight>
          <Badge>Slice</Badge>
          <div>38 mins</div>
        </LeftRight>
        <LeftRight>
          <Badge>Brush</Badge>
          <div>12 mins</div>
        </LeftRight>
        <LeftRight>
          <Badge>Bande</Badge>
          <div>32 mins</div>
        </LeftRight>
      </ProfileWrapper>
    );
  }
}
