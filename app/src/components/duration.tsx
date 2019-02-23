import * as React from 'react';
import styled, { css } from '../styled-components';

const DurationElements = styled.span<{ size: DurationProps['size'] }>`
  color: ${props => props.theme.color.grey};
  vertical-align: middle;

  & > span {
    font-size: ${props => {
      const factor = props.size === 'normal' ? 1.5 : 1;
      return css`
        ${props.theme.fontSize.m * factor}px
      `;
    }};
    color: ${props => props.theme.color.white};
  }
`;

export interface DurationProps {
  hours: string;
  minutes: string;
  seconds: string;
  size: 'normal' | 'small';
}

export class Duration extends React.PureComponent<DurationProps> {
  public static defaultProps: Partial<DurationProps> = {
    size: 'normal',
  };

  public render(): JSX.Element {
    const { size, hours, minutes, seconds } = this.props;
    return (
      <DurationElements size={size}>
        <span>{hours}</span>h <span>{minutes}</span>m <span>{seconds}</span>s
      </DurationElements>
    );
  }
}
