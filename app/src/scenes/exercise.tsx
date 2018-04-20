import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Editor } from '../components/editor';
import { Text } from '../components/text';
import { View } from '../components/view';
import { Exercise as ExerciseStore, State } from '../stores/exercise';
import { S3 } from '../stores/s3';
import { Storage } from '../stores/storage';
import { formatDuration } from '../utils';

const ExerciseWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const ImageSizer = styled(View)`
  align-self: center;
  width: 300px;
`;

const LeftRight = styled(View)`
  display: flex;
  justify-content: space-between;
`;

export interface ExerciseProps {
  exercise: ExerciseStore;
  storage: Storage;
  s3: S3;
}

@inject('exercise', 'storage', 's3')
@observer
export class Exercise extends React.Component<
  ExerciseProps & RouteComponentProps<{ id: string }>
> {
  public render(): JSX.Element {
    const id = this.props.match.params.id;
    const [blue, red] = this.props.s3.getBarPositions(id);
    return (
      <ExerciseWrapper>
        <ImageSizer>
          <Editor width={1115} height={680} blueBars={blue} redBars={red} />
        </ImageSizer>
        <LeftRight>
          <Text>Gesamt Trainingszeit</Text>
          <Badge>
            {formatDuration(
              this.props.storage.exerciseTrainingTime(
                this.props.match.params.id
              )
            )}
          </Badge>
        </LeftRight>
        <LeftRight>
          <Text>Auslösen</Text>
          <Badge>1h 14m</Badge>
        </LeftRight>
        <LeftRight>
          <Text>Aktuelle Quote</Text>
          <Badge>64%</Badge>
        </LeftRight>
        {this.renderState()}
      </ExerciseWrapper>
    );
  }

  private renderState(): JSX.Element {
    if (this.props.exercise.state !== State.NONE) {
      return this.renderActive();
    }
    return this.renderInitial();
  }

  private renderInitial(): JSX.Element {
    return <Button onPress={this.onStart}>Start Timer</Button>;
  }

  private renderActive(): JSX.Element {
    return (
      <>
        <Button onPress={this.onPause}>Pause</Button>
        <Button onPress={this.onStop}>Stop</Button>
        <div>{formatDuration(this.props.exercise.elapsedTime)}</div>
      </>
    );
  }

  @bind
  private onStart(): void {
    this.props.exercise.start(this.props.match.params.id);
  }

  @bind
  private onStop(): void {
    this.props.exercise.stop();
  }

  @bind
  private onPause(): void {
    this.props.exercise.pause();
  }
}
