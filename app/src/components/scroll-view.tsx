import * as React from 'react';
import styled from 'styled-components';

import { View } from './view';

const ScrollViewWrapper = styled(View)`
  flex: 1 0 auto;
  overflow: auto;
`;

export class ScrollView extends React.PureComponent {
  public render(): JSX.Element {
    return <ScrollViewWrapper>{this.props.children}</ScrollViewWrapper>;
  }
}
