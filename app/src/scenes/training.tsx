import { bind } from 'decko';
import { inject, observer } from 'mobx-react';
import NoSleep from 'nosleep.js';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { ButtonGroup } from '../components/button-group';
import { Duration } from '../components/duration';
import { Editor } from '../components/editor';
import { Space } from '../components/space';
import { Text } from '../components/text';
import { TrainingTable } from '../components/training-table';
import { View } from '../components/view';
import { Analytics } from '../stores/analytics';
import { ExerciseCatalogue } from '../stores/exercise-catalogue';
import { TrainingJournal } from '../stores/training-journal';
import { State, TrainingSession } from '../stores/training-session';
import styled from '../styled-components';
import { calculateQuota, getDurationParts } from '../utils';

const Wrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const CenteredText = styled(Text)`
  display: block;
  text-align: center;
  font-size: ${props => props.theme.fontSize.m}px;
  font-weight: bold;
`;

const ImageSizer = styled(View)`
  align-self: center;
  width: 95%;
`;

export interface ExerciseProps {
  trainingSession: TrainingSession;
  trainingJournal: TrainingJournal;
  exerciseCatalogue: ExerciseCatalogue;
  analytics: Analytics;
}

export interface ExerciseState {
  nosleep: import('nosleep.js').default;
}

type RouteProps = RouteComponentProps<{ id: string }>;

@inject('trainingSession', 'trainingJournal', 'exerciseCatalogue', 'analytics')
@observer
export class Training extends React.Component<
  ExerciseProps & RouteProps,
  ExerciseState
> {
  public componentDidMount(): void {
    this.setState({
      nosleep: new NoSleep(),
    });
  }
  public componentWillUnmount(): void {
    this.props.trainingSession.stop();
  }

  public render(): JSX.Element {
    const id = this.props.match.params.id;
    const exercise = this.props.exerciseCatalogue.getExercise(id);
    if (!exercise) {
      throw new Error(`Invalid exercise '${id}'`);
    }
    const { arrows, name } = exercise;
    const [blue, red] = this.props.exerciseCatalogue.getBarPositions(id);

    const [totalHours, totalMinutes, totalSeconds] = getDurationParts(
      this.props.trainingJournal.exerciseTrainingTime(
        this.props.match.params.id
      ) + this.props.trainingSession.totalTime
    );
    const totalQuota = this.calculateQuota();
    const [currentHours, currentMinutes, currentSeconds] = getDurationParts(
      this.props.trainingSession.totalTime
    );

    return (
      <Wrapper>
        <ImageSizer>
          <Editor
            width={1115}
            height={680}
            blueBars={blue}
            redBars={red}
            arrows={arrows}
          />
        </ImageSizer>
        <Space inset="m" stretch>
          <CenteredText>{name}</CenteredText>
        </Space>
        <Space inset="m" stretch>
          <TrainingTable
            hours={totalHours}
            minutes={totalMinutes}
            seconds={totalSeconds}
            quota={totalQuota}
          />
        </Space>
        {this.props.trainingSession.state === State.NONE ? (
          <Button onPress={this.onStart}>Start training</Button>
        ) : (
          <Space between="m">
            <CenteredText>
              <Badge>
                <Duration
                  hours={currentHours}
                  minutes={currentMinutes}
                  seconds={currentSeconds}
                />
              </Badge>
            </CenteredText>
            <ButtonGroup>
              <Button
                icon={
                  this.props.trainingSession.state === State.PAUSED
                    ? 'play'
                    : 'pause'
                }
                onPress={this.onPause}
              >
                {this.props.trainingSession.state === State.PAUSED
                  ? 'Resume'
                  : 'Pause'}
              </Button>
              <Button icon="stop" onPress={this.onStop}>
                End training
              </Button>
            </ButtonGroup>
            <CenteredText color="grey">
              Optionally: Track your quota
            </CenteredText>
            <ButtonGroup>
              <Button icon="check" intent="accept" onPress={this.onHit}>
                Hit
              </Button>
              <Button icon="close" intent="dismiss" onPress={this.onMiss}>
                Miss
              </Button>
            </ButtonGroup>
          </Space>
        )}
      </Wrapper>
    );
  }

  private calculateQuota(): number | null {
    const [pastHits, pastMisses] = this.props.trainingJournal.exerciseQuota(
      this.props.match.params.id
    );
    const [hits, misses] = this.props.trainingSession.quota;

    return calculateQuota([pastHits + hits, pastMisses + misses]);
  }

  @bind
  private onStart(): void {
    this.props.trainingSession.start(this.props.match.params.id);
    this.props.analytics.track('start', {
      event_category: 'training',
    });
    this.state.nosleep.enable();
  }

  @bind
  private onStop(): void {
    this.props.trainingSession.stop();
    this.props.analytics.track('stop', {
      event_category: 'training',
    });
    this.state.nosleep.disable();
  }

  @bind
  private onPause(): void {
    this.props.trainingSession.pause();
    this.props.analytics.track('pause', {
      event_category: 'training',
    });
    this.props.trainingSession.state === State.PAUSED
      ? this.state.nosleep.enable()
      : this.state.nosleep.disable();
  }

  @bind
  private onHit(): void {
    this.props.trainingSession.recordHit();
    this.props.analytics.track('hit', {
      event_category: 'training',
    });
  }

  @bind
  private onMiss(): void {
    this.props.trainingSession.recordMiss();
    this.props.analytics.track('miss', {
      event_category: 'training',
    });
  }
}
