import * as React from 'react';
import styled, { css } from 'styled-components';

function getTypeStyle(props: LayoutProps): any {
  switch (props.type) {
    case '2-columns':
      return css`
        justify-content: space-between;
      `;
    case 'column':
    case 'row':
      return css`
        flex-direction: ${props.type};
      `;
  }
}

const LayoutWrapper = styled.div`
  display: flex;
  ${(props: LayoutProps) => getTypeStyle(props)};
`;

export interface LayoutProps {
  type: '2-columns' | 'column' | 'row';
}

export class Layout extends React.PureComponent<LayoutProps> {
  public render(): JSX.Element {
    return (
      <LayoutWrapper type={this.props.type}>
        {this.props.children}
      </LayoutWrapper>
    );
  }
}
