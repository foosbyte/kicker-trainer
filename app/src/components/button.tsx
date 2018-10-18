import { bind } from 'decko';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css, ThemeInterface } from '../styled-components';

import { View } from './view';

interface ButtonStyleProps {
  theme: ThemeInterface;
}

function getButtonStyle(props: ButtonStyleProps): any {
  return css`
    text-decoration: initial;
    cursor: pointer;
    display: block;
    border-radius: 2px;
    background-color: ${props.theme.color.green};
    padding: ${props.theme.space.s}px;
    text-align: center;
    color: ${props.theme.color.anthrazit};
  `;
}

const StyledA = styled.a`
  ${getButtonStyle};
`;

const StyledButton: any = styled(View)`
  ${getButtonStyle};
`;

const StyledLink = styled(Link)`
  ${getButtonStyle};
`;

export interface ButtonProps {
  to?: string;
  href?: string;
  onPress?: () => void;
}

export class Button extends React.PureComponent<ButtonProps> {
  public render(): JSX.Element {
    const { to, href, onPress, children, ...props } = this.props;
    if (to) {
      return (
        <StyledLink to={to} {...props}>
          {children}
        </StyledLink>
      );
    } else if (href) {
      return (
        <StyledA href={href} {...props}>
          {children}
        </StyledA>
      );
    }
    return (
      <StyledButton onClick={this.handlePress} {...props}>
        {children}
      </StyledButton>
    );
  }

  @bind
  private handlePress(): void {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress();
    }
  }
}
