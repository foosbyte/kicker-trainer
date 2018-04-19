import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Editor } from '../components/editor';
import { Text } from '../components/text';
import { View } from '../components/view';
import { Exercise as ExerciseStore, State } from '../stores/exercise';

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
}

@inject('exercise')
@observer
export class Exercise extends React.Component<ExerciseProps> {
  public render(): JSX.Element {
    return (
      <ExerciseWrapper>
        <ImageSizer>
          <Editor
            width={1115}
            height={680}
            blueBars={{ 1: 0, 2: 0, 5: 0, 3: 0 }}
            redBars={{ 1: 0, 2: 0, 5: 0, 3: 0 }}
          />
        </ImageSizer>
        <LeftRight>
          <Text>Gesamt Trainingszeit</Text>
          <Badge>5 hr 18 min</Badge>
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
        {this.renderTimer()}
      </>
    );
  }

  private renderTimer(): JSX.Element {
    const diff = this.props.exercise.elapsedTime;
    const s = Math.floor(diff / 1000) % 60;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const h = Math.floor(diff / 1000 / 60 / 60);
    return (
      <div>
        {h.toString().padStart(2, '0')}h {m.toString().padStart(2, '0')}m{' '}
        {s.toString().padStart(2, '0')}s
      </div>
    );
  }

  @bind
  private onStart(): void {
    this.props.exercise.start();
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
