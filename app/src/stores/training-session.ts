import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { now } from 'mobx-utils';
import NoSleep from 'nosleep.js';
import { TrainingJournal } from './training-journal';

export enum State {
  RUNNING,
  PAUSED,
  NONE,
}

export class TrainingSession {
  private startDate: undefined | number = 0.0;
  private startTime: undefined | number = 0.0;
  private currentTime = 0;
  private trackedTime = 0;
  private hits = 0;
  private misses = 0;
  public state = State.NONE;
  private id?: string;
  private noSleep!: NoSleep;

  constructor(private trainingJournal: TrainingJournal) {
    makeObservable<
      TrainingSession,
      'startTime' | 'currentTime' | 'trackedTime' | 'hits' | 'misses'
    >(this, {
      startTime: observable,
      currentTime: observable,
      trackedTime: observable,
      hits: observable,
      misses: observable,
      state: observable,
      totalTime: computed,
      quota: computed,
      start: action,
      stop: action,
      pause: action,
      recordHit: action,
      recordMiss: action,
    });

    autorun(() => {
      if (this.state !== State.RUNNING) {
        return;
      }
      const time = now() - (this.startTime || 0);

      runInAction(() => {
        if (time >= 0) {
          this.currentTime = time;
        }
      });
    });

    if (typeof window !== 'undefined') {
      this.noSleep = new NoSleep();
    }
  }

  public get totalTime(): number {
    return this.trackedTime + this.currentTime;
  }

  public get quota(): [number, number] {
    return [this.hits, this.misses];
  }

  public start(id: string): void {
    this.state = State.RUNNING;
    this.startTime = now();
    this.startDate = now();
    this.trackedTime = 0;
    this.currentTime = 0;
    this.id = id;
    this.noSleep.enable();
  }

  public stop(): void {
    this.state = State.NONE;
    if (this.startDate) {
      this.trainingJournal.addTraining(this.id!, {
        date: this.startDate,
        duration: this.totalTime,
        quota: [this.hits, this.misses],
      });
    }
    this.currentTime = 0;
    this.trackedTime = 0;
    this.hits = 0;
    this.misses = 0;
    this.noSleep.disable();
  }

  public pause(): void {
    if (this.startTime) {
      this.state = State.PAUSED;
      this.startTime = undefined;
      this.trackedTime += this.currentTime;
      this.currentTime = 0;
      this.noSleep.disable();
    } else {
      this.state = State.RUNNING;
      this.startTime = now();
      this.noSleep.enable();
    }
  }

  public recordHit(): void {
    this.hits += 1;
  }

  public recordMiss(): void {
    this.misses += 1;
  }
}
