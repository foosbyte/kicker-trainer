import * as React from 'react';
import styled from 'styled-components';
import { View } from './view';

const ScrollViewWrapper = styled(View)`
  flex: 1 0 auto;
  overflow: auto;
  width: 100%;
  height: 100%;
`;

export class ScrollView extends React.PureComponent<{ className?: string }> {
  public render(): JSX.Element {
    return (
      <ScrollViewWrapper
        className={this.props.className}
        data-role="scrollview"
      >
        {this.props.children}
      </ScrollViewWrapper>
    );
  }
}
