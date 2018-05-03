import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { ExerciseCatalogue } from '../stores/exercise-catalogue';
import { TrainingJournal } from '../stores/training-journal';
import { formatDuration } from '../utils';
import { Badge } from './badge';
import { View } from './view';

const LeftRight = styled(View)`
  display: flex;
  justify-content: space-between;
`;

export interface RecentTrainingsProps {
  trainingJournal?: TrainingJournal;
  exerciseCatalogue?: ExerciseCatalogue;
}

@inject('trainingJournal', 'exerciseCatalogue')
@observer
export class RecentTrainings extends React.Component<RecentTrainingsProps> {
  public render(): JSX.Element | null {
    if (!this.props.trainingJournal) {
      return null;
    }
    return (
      <View>
        {this.props.trainingJournal.lastExercises.map(exercise => {
          const ex =
            this.props.exerciseCatalogue &&
            this.props.exerciseCatalogue.getExercise(exercise.id);
          if (!ex) {
            return null;
          }
          return (
            <LeftRight key={exercise.id}>
              <Badge>{ex.name}</Badge>
              <div>
                {formatDuration(
                  this.props.trainingJournal!.exerciseTrainingTime(exercise.id)
                )}
              </div>
            </LeftRight>
          );
        })}
      </View>
    );
  }
}
