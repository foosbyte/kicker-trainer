import * as React from 'react';
import { theme } from '../styled-components';

export type TextProps = React.HTMLAttributes<HTMLSpanElement> &
  React.Props<HTMLSpanElement> & {
    color?: keyof typeof theme['color'];
  };

export class Text extends React.PureComponent<TextProps> {
  public render(): JSX.Element {
    const { children, color: themeColor, ...props } = this.props;
    const color = themeColor ? theme.color[themeColor] : 'currentColor';
    return (
      <span {...props} style={{ color }}>
        {children}
      </span>
    );
  }
}
