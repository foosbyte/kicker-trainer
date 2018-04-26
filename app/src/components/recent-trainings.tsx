import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { S3 } from '../stores/s3';
import { Storage } from '../stores/storage';
import { formatDuration } from '../utils';
import { Badge } from './badge';
import { View } from './view';

const LeftRight = styled(View)`
  display: flex;
  justify-content: space-between;
`;

export interface RecentTrainingsProps {
  storage?: Storage;
  s3?: S3;
}

@inject('storage', 's3')
@observer
export class RecentTrainings extends React.Component<RecentTrainingsProps> {
  public render(): JSX.Element | null {
    if (!this.props.storage) {
      return null;
    }
    return (
      <View>
        {this.props.storage.exercises.map(exercise => {
          const ex = this.props.s3 && this.props.s3.getExercise(exercise.id);
          if (!ex) {
            return null;
          }
          return (
            <LeftRight key={exercise.id}>
              <Badge>{ex.name}</Badge>
              <div>
                {formatDuration(
                  this.props.storage!.exerciseTrainingTime(exercise.id)
                )}
              </div>
            </LeftRight>
          );
        })}
      </View>
    );
  }
}
