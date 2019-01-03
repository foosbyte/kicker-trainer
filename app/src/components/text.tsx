import * as React from 'react';

export type TextProps = React.HTMLAttributes<HTMLSpanElement> &
  React.Props<HTMLSpanElement>;

export class Text extends React.PureComponent<TextProps> {
  public render(): JSX.Element {
    const { children, ...props } = this.props;
    return <span {...props}>{children}</span>;
  }
}
