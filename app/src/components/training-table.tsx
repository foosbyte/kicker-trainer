import * as React from 'react';
import styled from '../styled-components';
import { Duration } from './duration';
import { ProgressCircle } from './progress-circle';
import { Text } from './text';

const StatsTable = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: ${props => props.theme.space.m}px;
  justify-items: center;
  align-items: center;
`;

const Label = styled(Text)`
  order: 2;
`;

const Quota = styled.div``;

export interface TrainingTableProps {
  hours: string;
  minutes: string;
  seconds: string;
  quota: number | null;
}

export class TrainingTable extends React.PureComponent<TrainingTableProps> {
  public render(): JSX.Element {
    const { hours, minutes, seconds } = this.props;
    const quota = this.props.quota;

    return (
      <StatsTable>
        <Duration hours={hours} minutes={minutes} seconds={seconds} />
        <Label color="grey">Gesamt Trainingszeit</Label>
        <Quota>
          {quota !== null ? (
            <ProgressCircle
              color="blue"
              textColor="white"
              backgroundColor="grey"
              progress={quota * 100}
              radius={40}
              stroke={5}
            />
          ) : (
            '-'
          )}
        </Quota>
        <Label color="grey">Gesamt Quote (%)</Label>
      </StatsTable>
    );
  }
}
