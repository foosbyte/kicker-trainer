import * as React from 'react';
import styled, { ThemeInterface } from '../styled-components';

import { View } from './view';

interface SpaceWrapperProps extends SpaceProps {
  theme?: ThemeInterface;
}

const StyledInset = styled.div`
  padding: ${({ theme, inset = 'm', squish, stretch }: SpaceWrapperProps) => {
    const s = theme ? theme.space[inset] : 16;
    return inset ? `${s}px ${squish ? s / 2 : stretch ? s * 1.5 : s}px` : '0';
  }};
`;

const StyledOutset = styled.div`
  ${(props: SpaceWrapperProps) =>
    props.inline ? 'margin-right' : 'margin-bottom'}: ${({
    theme,
    between = 'm',
  }: SpaceWrapperProps) => (theme ? theme.space[between] : 16)}px;
`;

export interface SpaceProps {
  inset?: keyof ThemeInterface['space'];
  squish?: boolean;
  stretch?: boolean;
  between?: keyof ThemeInterface['space'];
  inline?: boolean;
}

export class Space extends React.PureComponent<SpaceProps> {
  public render(): JSX.Element | JSX.Element[] {
    const numChildren = React.Children.count(this.props.children);
    return this.props.inset ? (
      <StyledInset
        inset={this.props.inset}
        squish={this.props.squish}
        stretch={this.props.stretch}
      >
        {this.props.children}
      </StyledInset>
    ) : (
      React.Children.map(this.props.children, (child, i) => {
        const Wrapper = i < numChildren - 1 ? StyledOutset : View;
        return (
          <Wrapper between={this.props.between} inline={this.props.inline}>
            {child}
          </Wrapper>
        );
      })
    );
  }
}
