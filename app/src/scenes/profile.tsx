import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { Avatar } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { View } from '../components/view';
import { Store } from '../stores/store';

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

export interface ProfileProps {
  store: Store;
}

@inject('store')
@observer
export class Profile extends React.Component<ProfileProps> {
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
        <Centered>
          <Button to="/categories">
            Start Training {this.props.store.text}
          </Button>
        </Centered>
      </ProfileWrapper>
    );
  }
}
