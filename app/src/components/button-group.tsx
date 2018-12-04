import * as React from 'react';
import styled from '../styled-components';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  // ugly part here
  > * {
    width: 100%;
    margin-left: 2px;

    :first-child {
      margin-left: 0px;
      border-radius: 0 2px 2px 0;
    }

    :last-child {
      border-radius: 2px 0 0 2px;
    }
  }
`;

export class ButtonGroup extends React.Component {
  public render(): JSX.Element {
    return <ButtonContainer>{this.props.children}</ButtonContainer>;
  }
}
