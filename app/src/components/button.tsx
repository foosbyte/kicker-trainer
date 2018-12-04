import { bind } from 'decko';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css, theme } from '../styled-components';

import { View } from './view';
import { IconType, Icon } from './icon';

interface ButtonStyleProps {
  theme: typeof theme;
  intent: ButtonProps['intent'];
}

function getButtonStyle(props: ButtonStyleProps): any {
  return css<ButtonStyleProps>`
    text-decoration: initial;
    cursor: pointer;
    display: block;
    border-radius: 2px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    background-color: ${props => {
      switch (props.intent) {
        case 'accept':
          return props.theme.color.blue;
        case 'dismiss':
          return props.theme.color.red;
        default:
          return props.theme.color.green;
      }
    }};
    box-shadow: 0 1px 4px 0 rgba(32, 33, 33, 0.5);
    padding: ${props.theme.space.m}px;
    text-align: center;
    color: ${props =>
      props.intent !== 'default'
        ? props.theme.color.white
        : props.theme.color.anthrazit};
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
  intent: 'accept' | 'dismiss' | 'default';
  icon?: IconType;
}

export class Button extends React.PureComponent<ButtonProps> {
  public static defaultProps = {
    intent: 'default',
  };

  public render(): JSX.Element {
    const { to, href, onPress, children, icon, ...props } = this.props;
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
        {icon && <Icon icon={icon} />}
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
