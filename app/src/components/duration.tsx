import * as React from 'react';
import styled from '../styled-components';

const DurationElements = styled.div`
  color: ${props => props.theme.color.grey};

  & > span {
    font-size: ${props => props.theme.fontSize.m * 1.5}px;
    color: ${props => props.theme.color.white};
  }
`;

export interface DurationProps {
  hours: string;
  minutes: string;
  seconds: string;
}

export class Duration extends React.PureComponent<DurationProps> {
  public render(): JSX.Element {
    const { hours, minutes, seconds } = this.props;
    return (
      <DurationElements>
        <span>{hours}</span>h <span>{minutes}</span>m <span>{seconds}</span>s
      </DurationElements>
    );
  }
}
