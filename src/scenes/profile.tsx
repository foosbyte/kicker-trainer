import * as React from 'react';

import { Avatar } from '../components/avatar';
import { Badge } from '../components/badge';
import { Layout } from '../components/layout';

export class Profile extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Layout type="centered-column" direction="column">
        <Avatar size="normal" />
        <Layout type="items-left-right" direction="row">
          <Badge>Slice</Badge>
          <div>38 mins</div>
        </Layout>
        <Layout type="items-left-right" direction="row">
          <Badge>Brush</Badge>
          <div>12 mins</div>
        </Layout>
        <Layout type="items-left-right" direction="row">
          <Badge>Bande</Badge>
          <div>32 mins</div>
        </Layout>
      </Layout>
    );
  }
}
