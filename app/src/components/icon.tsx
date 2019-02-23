import * as React from 'react';

export type IconType =
  | 'user'
  | 'user-circle'
  | 'settings-alt'
  | 'bar-chart'
  | 'play'
  | 'pause'
  | 'stop'
  | 'check'
  | 'close'
  | 'arrow-right'
  | 'cog';

export type IconSize = 18 | 24;

export interface IconProps {
  icon: IconType;
  size?: IconSize;
  className?: string;
}

export class Icon extends React.PureComponent<IconProps> {
  public static defaultProps = { size: 18 as IconSize };

  public render(): JSX.Element {
    const classNames = [
      'jam',
      `jam-${this.props.icon}`,
      this.props.className,
    ].join(' ');
    return <i className={classNames} style={{ fontSize: this.props.size }} />;
  }
}
