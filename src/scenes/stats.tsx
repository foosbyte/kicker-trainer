import * as React from 'react';

import { Text } from '../components/text';
import { View } from '../components/view';

export class Stats extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <View>
        <Text>You are doing fabulous!</Text>
      </View>
    );
  }
}
