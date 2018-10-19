import * as React from 'react';

export type ViewProps = React.HTMLAttributes<HTMLDivElement> &
  React.Props<HTMLDivElement>;

export class View extends React.PureComponent<ViewProps> {
  public render(): JSX.Element {
    const { children, ...props } = this.props;
    return <div {...props}>{children}</div>;
  }
}
