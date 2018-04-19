import { action, computed, observable, runInAction } from 'mobx';
import { Storage } from './storage';

export enum State {
  RUNNING,
  PAUSED,
  NONE,
}

export class Exercise {
  @observable private startDate?: Date;
  @observable private endDate?: Date;
  @observable private totalDuration?: number;
  @observable public elapsedTime!: number;
  @observable public state!: State;
  private id?: string;
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    runInAction(() => {
      this.state = State.NONE;
      this.elapsedTime = 0;
    });
  }

  @computed
  public get startTime(): number {
    return this.startDate ? this.startDate.getTime() : 0;
  }

  @computed
  public get totalTime(): number {
    return this.totalDuration || 0;
  }

  @action
  public start(id: string): void {
    this.state = State.RUNNING;
    this.startDate = new Date();
    this.totalDuration = 0;
    this.id = id;
    this.tick();
  }

  @action
  private tick(): void {
    if (this.state !== State.RUNNING) {
      return;
    }

    this.elapsedTime = Date.now() - this.startTime + this.totalTime;

    setTimeout(this.tick.bind(this), 1000);
  }

  @action
  public stop(): void {
    this.state = State.NONE;
    this.endDate = new Date();
    if (this.startDate && typeof this.totalDuration === 'number') {
      this.totalDuration += this.endDate.getTime() - this.startDate.getTime();

      this.storage.addTraining(this.id!, {
        date: this.startDate,
        duration: this.totalDuration,
      });
    }
  }

  @action
  public pause(): void {
    if (this.startDate) {
      this.stop();
      this.state = State.PAUSED;
      this.startDate = undefined;
    } else {
      this.state = State.RUNNING;
      this.startDate = new Date();
      this.tick();
    }
  }
}
