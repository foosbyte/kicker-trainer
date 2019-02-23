import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import background from '../background@2x.png';
import { Text } from '../components/text';
import { View } from '../components/view';
import { ExerciseCatalogue } from '../stores/exercise-catalogue';
import { TrainingJournal } from '../stores/training-journal';
import { calculateQuota, formatDuration, formatQuota } from '../utils';

export interface StatsProps {
  trainingJournal: TrainingJournal;
  exerciseCatalogue: ExerciseCatalogue;
}

interface StatsState {
  LineChart: typeof import('react-chartkick').LineChart | null;
}

const FullWidthTable = styled.table`
  width: 100%;
`;

const StatsWrapper = styled(View)`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
`;

@inject('trainingJournal', 'exerciseCatalogue')
@observer
export class Stats extends React.Component<StatsProps, StatsState> {
  public state: StatsState = {
    LineChart: null,
  };

  public componentDidMount(): void {
    Promise.all([import('chart.js'), import('react-chartkick')]).then(
      ([Chart, ReactChartkick]) => {
        ReactChartkick.default.addAdapter(Chart.default);
        this.setState({ LineChart: ReactChartkick.LineChart });
      }
    );
  }

  public render(): JSX.Element {
    const { LineChart } = this.state;

    return (
      <StatsWrapper>
        <View>
          <Text>You are doing fabulous!</Text>
        </View>
        <View>
          <Text>
            Total training time:{' '}
            {formatDuration(this.props.trainingJournal.totalTrainingTime())}
          </Text>
        </View>
        <FullWidthTable>
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Time</th>
              <th>Quota</th>
            </tr>
          </thead>
          <tbody>
            {this.props.trainingJournal.exercises.map(exercise => {
              const ex =
                this.props.exerciseCatalogue &&
                this.props.exerciseCatalogue.getExercise(exercise.id);
              if (!ex) {
                return null;
              }
              return (
                <tr key={exercise.id}>
                  <td>{ex.name}</td>
                  <td>
                    {formatDuration(
                      this.props.trainingJournal.exerciseTrainingTime(
                        exercise.id
                      )
                    )}
                  </td>
                  <td>
                    {formatQuota(
                      calculateQuota(
                        this.props.trainingJournal.exerciseQuota(exercise.id)
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </FullWidthTable>
        {LineChart && (
          <LineChart
            xtitle="Time"
            ytitle="Quota"
            min={0}
            max={100}
            data={this.props.trainingJournal.exercises.map(exercise => {
              const ex =
                this.props.exerciseCatalogue &&
                this.props.exerciseCatalogue.getExercise(exercise.id);
              return {
                name: (ex && ex.name) || 'unknown',
                data: exercise.trainings.reduce(
                  (accum, training) => {
                    accum.quota = [
                      accum.quota[0] + training.quota[0],
                      accum.quota[1] + training.quota[1],
                    ];
                    const quota = calculateQuota(accum.quota);
                    if (quota) {
                      accum.data[
                        new Date(training.date).toISOString()
                      ] = Math.floor(quota * 100);
                    }
                    return accum;
                  },
                  { data: {}, quota: [0, 0] } as {
                    data: { [date: string]: number };
                    quota: [number, number];
                  }
                ).data,
              };
            })}
          />
        )}
      </StatsWrapper>
    );
  }
}
