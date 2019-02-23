import * as React from 'react';
import styled, { theme } from '../styled-components';

const StyledCircle = styled.circle`
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  color: currentColor;
`;

export interface ProgressCircleProps {
  radius: number;
  stroke: number;
  progress: number;
  color: keyof (typeof theme)['color'];
  textColor: keyof (typeof theme)['color'];
  backgroundColor: keyof (typeof theme)['color'];
}

export class ProgressCircle extends React.PureComponent<ProgressCircleProps> {
  private normalizedRadius: number;

  private circumference: number;

  constructor(props: ProgressCircleProps) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  public render(): JSX.Element {
    const { radius, stroke, progress } = this.props;

    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;

    return (
      <svg height={radius * 2} width={radius * 2}>
        <StyledCircle
          stroke={theme.color[this.props.backgroundColor]}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={10000}
          style={{ strokeDashoffset: 100 }}
          stroke-width={stroke}
          r={this.normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <StyledCircle
          stroke={theme.color[this.props.color]}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={this.circumference + ' ' + this.circumference}
          style={{ strokeDashoffset }}
          stroke-width={stroke}
          r={this.normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          stroke={theme.color[this.props.textColor]}
          x={radius}
          y={radius}
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {progress.toFixed()}
        </text>
      </svg>
    );
  }
}
