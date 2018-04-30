import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { Text } from '../components/text';
import { View } from '../components/view';
import { TrainingJournal } from '../stores/training-journal';
import { formatDuration } from '../utils';

export interface StatsProps {
  trainingJournal: TrainingJournal;
}

@inject('trainingJournal')
@observer
export class Stats extends React.Component<StatsProps> {
  public render(): JSX.Element {
    return (
      <>
        <View>
          <Text>You are doing fabulous!</Text>
        </View>
        <View>
          <Text>
            Total training time:{' '}
            {formatDuration(this.props.trainingJournal.totalTrainingTime())}
          </Text>
        </View>
      </>
    );
  }
}
