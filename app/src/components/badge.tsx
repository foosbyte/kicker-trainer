import * as React from 'react';
import styled from '../styled-components';

const BadgeWrapper = styled.span`
  padding: 6px 20px;
  color: white;
  background-color: black;
  border-radius: 22px;
`;

export class Badge extends React.PureComponent {
  public render(): JSX.Element {
    return <BadgeWrapper>{this.props.children}</BadgeWrapper>;
  }
}
