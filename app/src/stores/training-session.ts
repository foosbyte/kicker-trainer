import { action, autorun, computed, observable, runInAction } from 'mobx';
import { now } from 'mobx-utils';
import { TrainingJournal } from './training-journal';

export enum State {
  RUNNING,
  PAUSED,
  NONE,
}

export class TrainingSession {
  private startDate?: number;
  @observable private startTime?: number;
  @observable private current!: number;
  @observable private tracked!: number;
  @observable public state!: State;
  private id?: string;
  private trainingJournal: TrainingJournal;

  constructor(trainingJournal: TrainingJournal) {
    this.trainingJournal = trainingJournal;

    runInAction(() => {
      this.state = State.NONE;
      this.tracked = 0;
      this.current = 0;
    });

    autorun(() => {
      if (this.state !== State.RUNNING) {
        return;
      }
      const time = now() - (this.startTime || 0);

      runInAction(() => {
        if (time >= 0) {
          this.current = time;
        }
      });
    });
  }

  @computed
  public get totalTime(): number {
    return this.tracked + this.current;
  }

  @action
  public start(id: string): void {
    this.state = State.RUNNING;
    this.startTime = now();
    this.startDate = now();
    this.tracked = 0;
    this.current = 0;
    this.id = id;
  }

  @action
  public stop(): void {
    this.state = State.NONE;
    if (this.startDate) {
      this.trainingJournal.addTraining(this.id!, {
        date: this.startDate,
        duration: this.totalTime,
      });
    }
    this.current = 0;
    this.tracked = 0;
  }

  @action
  public pause(): void {
    if (this.startTime) {
      this.state = State.PAUSED;
      this.startTime = undefined;
      this.tracked += this.current;
      this.current = 0;
    } else {
      this.state = State.RUNNING;
      this.startTime = now();
    }
  }
}
