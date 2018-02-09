import * as React from 'react';
import styled, { css } from 'styled-components';

function getTypeStyle(props: LayoutProps): any {
  switch (props.type) {
    case 'items-left-right':
      return css`
        justify-content: space-between;
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
  flex-direction: ${(props: LayoutProps) => props.direction};
  ${(props: LayoutProps) => getTypeStyle(props)};
`;

const GrowingContent = styled.div`
  flex-grow: 1;
`;

export interface LayoutProps {
  type:
    | 'centered-column'
    | 'items-left-right'
    | 'equal-items'
    | 'content-bottom';
  direction: 'row' | 'column';
}

export class Layout extends React.PureComponent<LayoutProps> {
  public render(): JSX.Element {
    return (
      <LayoutWrapper type={this.props.type} direction={this.props.direction}>
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
      case 'equal-items': {
        return React.Children.map(this.props.children, child => (
          <GrowingContent>{child}</GrowingContent>
        ));
      }
      default:
        return this.props.children;
    }
  }
}
