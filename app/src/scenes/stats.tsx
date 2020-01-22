import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';
import background from '../background@2x.png';
import { PlotlyLineChart } from '../components/plotly';
import { Text } from '../components/text';
import { View } from '../components/view';
import { ExerciseCatalogue } from '../stores/exercise-catalogue';
import { TrainingJournal } from '../stores/training-journal';
import { calculateQuota, formatDuration, formatQuota } from '../utils';

export interface StatsProps {
  trainingJournal: TrainingJournal;
  exerciseCatalogue: ExerciseCatalogue;
}

const FullWidthTable = styled.table`
  width: 100%;
`;

const StatsWrapper = styled(View)`
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
`;

@inject('trainingJournal', 'exerciseCatalogue')
@observer
export class Stats extends React.Component<StatsProps> {
  public async componentDidMount(): Promise<void> {
    const { PlotlyLineChart } = await import('../components/plotly');
    this.setState({ PlotlyLineChart });
  }

  public render(): JSX.Element {
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
        <PlotlyLineChart
          title="Chart"
          x={['Jan 2019', 'Feb 2019', 'Mar 2019', 'Apr 2019']}
          y={[
            [2, 12, 18, 21],
            [10, 15, 13, 17],
          ]}
          legend={['a', 'b']}
        />
      </StatsWrapper>
    );
  }
}
