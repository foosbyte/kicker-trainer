import * as React from 'react';

export class View extends React.PureComponent<React.CSSProperties> {
  public render(): JSX.Element {
    const { children, ...props } = this.props;
    return <div {...props}>{children}</div>;
  }
}
