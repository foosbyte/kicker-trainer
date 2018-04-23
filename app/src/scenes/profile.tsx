import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { Avatar } from '../components/avatar';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { View } from '../components/view';
import { S3 } from '../stores/s3';
import { Storage } from '../stores/storage';
import { formatDuration } from '../utils';

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
  storage: Storage;
  s3: S3;
}

@inject('storage', 's3')
@observer
export class Profile extends React.Component<ProfileProps> {
  public render(): JSX.Element {
    return (
      <ProfileWrapper>
        <Centered>
          <Avatar size="normal" />
        </Centered>
        {this.props.storage.exercises.map(exercise => {
          const ex = this.props.s3.getExercise(exercise.id);
          if (!ex) {
            return null;
          }
          return (
            <LeftRight key={exercise.id}>
              <Badge>{ex.name}</Badge>
              <div>
                {formatDuration(
                  this.props.storage.exerciseTrainingTime(exercise.id)
                )}
              </div>
            </LeftRight>
          );
        })}
        <Centered>
          <Button to="/categories">Start Training</Button>
        </Centered>
      </ProfileWrapper>
    );
  }
}
