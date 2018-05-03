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
import { ExerciseCatalogue } from '../stores/exercise-catalogue';
import { TrainingJournal } from '../stores/training-journal';
import { State, TrainingSession } from '../stores/training-session';
import { formatDuration } from '../utils';

const Wrapper = styled(View)`
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
  trainingSession: TrainingSession;
  trainingJournal: TrainingJournal;
  exerciseCatalogue: ExerciseCatalogue;
}

type RouteProps = RouteComponentProps<{ id: string }>;

@inject('trainingSession', 'trainingJournal', 'exerciseCatalogue')
@observer
export class Training extends React.Component<ExerciseProps & RouteProps> {
  public componentWillUnmount(): void {
    this.props.trainingSession.stop();
  }

  public render(): JSX.Element {
    const id = this.props.match.params.id;
    const [blue, red] = this.props.exerciseCatalogue.getBarPositions(id);
    return (
      <Wrapper>
        <ImageSizer>
          <Editor width={1115} height={680} blueBars={blue} redBars={red} />
        </ImageSizer>
        <LeftRight>
          <Text>Gesamt Trainingszeit</Text>
          <Badge>
            {formatDuration(
              this.props.trainingJournal.exerciseTrainingTime(
                this.props.match.params.id
              ) + this.props.trainingSession.totalTime
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
      </Wrapper>
    );
  }

  private renderState(): JSX.Element {
    if (this.props.trainingSession.state !== State.NONE) {
      return (
        <>
          <Button onPress={this.onPause}>Pause</Button>
          <Button onPress={this.onStop}>Stop</Button>
          <div>{formatDuration(this.props.trainingSession.totalTime)}</div>
        </>
      );
    }
    return <Button onPress={this.onStart}>Start Timer</Button>;
  }

  @bind
  private onStart(): void {
    this.props.trainingSession.start(this.props.match.params.id);
  }

  @bind
  private onStop(): void {
    this.props.trainingSession.stop();
  }

  @bind
  private onPause(): void {
    this.props.trainingSession.pause();
  }
}
