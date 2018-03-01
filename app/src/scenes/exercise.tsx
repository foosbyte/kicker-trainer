import { bind } from 'decko';
import * as React from 'react';
import styled from 'styled-components';
import { clearInterval, setInterval } from 'timers';

import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Image } from '../components/image';
import { Text } from '../components/text';
import { View } from '../components/view';

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

export interface ExerciseState {
  start?: number;
  end?: number;
}

export class Exercise extends React.PureComponent<{}, ExerciseState> {
  private interval?: NodeJS.Timer;

  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  public componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public render(): JSX.Element {
    return (
      <ExerciseWrapper>
        <ImageSizer>
          <Image
            source="https://dummyimage.com/600x400/755175/cacbdb"
            width={600}
            height={400}
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
    if (this.state.end) {
      return this.renderPaused();
    } else if (this.state.start) {
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
        <Button onPress={this.onStop}>Stop Timer</Button>
        {this.renderTimer()}
      </>
    );
  }

  private renderTimer(): JSX.Element {
    const now = new Date().getTime();
    const diff = now - (this.state.start || now);
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

  private renderPaused(): JSX.Element {
    return (
      <>
        <Button onPress={this.restart}>Restart</Button>
        {this.renderTimer()}
      </>
    );
  }

  @bind
  private onStart(): void {
    this.setState({
      start: new Date().getTime(),
    });
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  @bind
  private onStop(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({
      end: new Date().getTime(),
    });
  }

  @bind
  private restart(): void {
    this.setState(
      {
        end: undefined,
        start: undefined,
      },
      () => {
        this.onStart();
      },
    );
  }
}
