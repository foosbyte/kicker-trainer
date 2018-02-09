import * as React from 'react';

import { Layout } from '../components/layout';
import { View } from '../components/view';

export class Categories extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <View>
        <h1>categories</h1>
        <Layout type="equal-items" direction="column">
          <div>Create workout</div>
          <div>5 Bar Excercises</div>
          <div>2 Bar Excercises</div>
          <div>3 Bar Excercises</div>
        </Layout>
      </View>
    );
  }
}
