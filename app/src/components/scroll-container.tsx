import * as React from 'react';
import styled from 'styled-components';

import { View } from './view';

const ScrollContainerWrapper = styled(View)`
  flex: 1 0 auto;
  overflow: auto;
`;

export class ScrollContainer extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ScrollContainerWrapper>{this.props.children}</ScrollContainerWrapper>
    );
  }
}
