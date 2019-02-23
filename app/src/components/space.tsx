/**
 * Idea from https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62
 */
import * as React from 'react';
import styled, { theme } from '../styled-components';
import { View } from './view';

interface SpaceWrapperProps extends SpaceProps {
  theme?: typeof theme;
}

const StyledInset = styled.div`
  padding: ${({ theme, inset = 'm', squish, stretch }: SpaceWrapperProps) => {
    const s = theme ? theme.space[inset] : 16;
    return inset ? `${squish ? s / 2 : s}px ${stretch ? s * 1.5 : s}px` : '0';
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
  className?: string;
  inset?: keyof typeof theme['space'];
  squish?: boolean;
  stretch?: boolean;
  between?: keyof typeof theme['space'];
  inline?: boolean;
}

export class Space extends React.PureComponent<SpaceProps> {
  public render(): JSX.Element | JSX.Element[] {
    const numChildren = React.Children.count(this.props.children);
    return this.props.inset ? (
      <StyledInset
        className={this.props.className}
        inset={this.props.inset}
        squish={this.props.squish}
        stretch={this.props.stretch}
      >
        {this.props.children}
      </StyledInset>
    ) : (
      React.Children.map(this.props.children, (child, i) => {
        return i < numChildren - 1 ? (
          <StyledOutset
            className={this.props.className}
            between={this.props.between}
            inline={this.props.inline}
          >
            {child}
          </StyledOutset>
        ) : (
          <View>{child}</View>
        );
      })
    );
  }
}
