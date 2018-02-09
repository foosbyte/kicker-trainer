import * as React from 'react';
import styled from 'styled-components';

const BadgeWrapper = styled.div`
  padding: 2px 10px;
  color: white;
  background-color: #000;
  border-radius: 1000px;
  opacity: 0.7;
`;

export class Badge extends React.PureComponent {
  public render(): JSX.Element {
    return <BadgeWrapper>{this.props.children}</BadgeWrapper>;
  }
}
