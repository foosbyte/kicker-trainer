import { observable, runInAction } from 'mobx';
import exercises from './exercises.json';

export enum Bars {
  '1bar' = '1bar',
  '2bar' = '2bar',
  '3bar' = '3bar',
  '5bar' = '5bar',
}

export interface Exercise {
  id: string;
  name: string;
  bars?: {
    red: { [B in Bars]: number };
    blue: { [B in Bars]: number };
  };
  arrows?: { start: { x: number; y: number }; end: { x: number; y: number } }[];
}

export class ExerciseCatalogue {
  @observable
  public data!: { [B in Bars]: Exercise[] };

  constructor() {
    runInAction(() => {
      this.data = exercises;
    });
  }

  public getExercise(id: string): Exercise | undefined {
    const exercises = Object.values(this.data).reduce(
      (xs, x) => [...xs, ...x],
      []
    );
    return exercises.find(e => e.id === id);
  }

  public getBarPositions(
    id: string
  ): [
    { 1: number; 2: number; 3: number; 5: number },
    { 1: number; 2: number; 3: number; 5: number }
  ] {
    const exercise = this.getExercise(id);
    if (exercise && exercise.bars) {
      return [
        {
          1: exercise.bars.blue['1bar'],
          2: exercise.bars.blue['2bar'],
          3: exercise.bars.blue['3bar'],
          5: exercise.bars.blue['5bar'],
        },
        {
          1: exercise.bars.red['1bar'],
          2: exercise.bars.red['2bar'],
          3: exercise.bars.red['3bar'],
          5: exercise.bars.red['5bar'],
        },
      ];
    }
    return [{ 1: 0, 2: 0, 5: 0, 3: 0 }, { 1: 0, 2: 0, 5: 0, 3: 0 }];
  }
}
