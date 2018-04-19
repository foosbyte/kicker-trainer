import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { Text } from '../components/text';
import { View } from '../components/view';
import { Storage } from '../stores/storage';
import { formatDuration } from '../utils';

export interface StatsProps {
  storage: Storage;
}

@inject('storage')
@observer
export class Stats extends React.Component<StatsProps> {
  public render(): JSX.Element {
    return (
      <View>
        <div>
          <Text>You are doing fabulous!</Text>
        </div>
        <div>
          <Text>
            Total training time:{' '}
            {formatDuration(this.props.storage.totalTrainingTime())}
          </Text>
        </div>
      </View>
    );
  }
}
