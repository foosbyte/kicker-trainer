import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ExerciseCatalogue } from '../stores/exercise-catalogue';
import { TrainingJournal } from '../stores/training-journal';
import styled, { css } from '../styled-components';
import { getDurationParts } from '../utils';
import { Duration } from './duration';
import { Space } from './space';
import { Text } from './text';

const RecentTrainingsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: ${props => props.theme.space.m}px;
  background-color: ${props => props.theme.color.transparentGrey};
`;

const TrainingEntry = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props =>
    css`
      ${props.theme.space.s}px 0
    `};
  border-bottom: ${props => css`1px solid ${props.theme.color.anthrazit}`};

  &:last-child {
    border-bottom: none;
  }
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
    const lastTrainings = this.props.trainingJournal.lastExercises.slice(0, 3);
    if (lastTrainings.length === 0) {
      return null;
    }

    return (
      <Space inset="l" stretch>
        <RecentTrainingsList>
          {lastTrainings.map(exercise => {
            const ex =
              this.props.exerciseCatalogue &&
              this.props.exerciseCatalogue.getExercise(exercise.id);
            if (!ex) {
              return null;
            }
            const [hours, minutes, seconds] = getDurationParts(
              this.props.trainingJournal!.exerciseTrainingTime(exercise.id, 1)
            );
            return (
              <TrainingEntry key={exercise.id}>
                <Text>{ex.name}</Text>
                <Duration
                  size="small"
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              </TrainingEntry>
            );
          })}
        </RecentTrainingsList>
      </Space>
    );
  }
}
