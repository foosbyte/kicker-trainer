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
    case 'centered-column':
      return css`
        flex-direction: column;
        align-items: center;
      `;
    case 'content-bottom':
      return css`
        flex-direction: column;
      `;
  }
}

const LayoutWrapper = styled.div`
  display: flex;
  ${(props: LayoutProps) => getTypeStyle(props)};
`;

const GrowingContent = styled.div`
  flex-grow: 1;
`;

export interface LayoutProps {
  type: 'centered-column' | '2-columns' | 'column' | 'row' | 'content-bottom';
}

export class Layout extends React.PureComponent<LayoutProps> {
  public render(): JSX.Element {
    return (
      <LayoutWrapper type={this.props.type}>
        {this.getLayoutMarkup()}
      </LayoutWrapper>
    );
  }

  private getLayoutMarkup(): React.ReactNode {
    switch (this.props.type) {
      case 'content-bottom': {
        const children = React.Children.toArray(this.props.children);
        return (
          <>
            <GrowingContent>{children[0]}</GrowingContent>
            <div>{children[1]}</div>
          </>
        );
      }
      default:
        return this.props.children;
    }
  }
}
