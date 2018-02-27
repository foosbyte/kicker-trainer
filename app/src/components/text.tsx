import * as React from 'react';

export class Text extends React.PureComponent<React.CSSProperties> {
  public render(): JSX.Element {
    const { children, ...props } = this.props;
    return <span {...props}>{children}</span>;
  }
}
