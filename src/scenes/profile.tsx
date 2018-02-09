import * as React from 'react';

import { Avatar } from '../components/avatar';
import { Badge } from '../components/badge';
import { Layout } from '../components/layout';

export class Profile extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <div>
        <h1>profile</h1>
        <Avatar size="normal" />
        <Layout type="column">
          <Layout type="2-columns">
            <Badge>Slice</Badge>
            <div>38 mins</div>
          </Layout>
          <Layout type="2-columns">
            <Badge>Brush</Badge>
            <div>12 mins</div>
          </Layout>
          <Layout type="2-columns">
            <Badge>Bande</Badge>
            <div>32 mins</div>
          </Layout>
        </Layout>
      </div>
    );
  }
}
