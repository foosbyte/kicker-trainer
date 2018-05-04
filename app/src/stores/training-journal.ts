import { action, autorun, computed, observable, runInAction } from 'mobx';
import { migrate } from './migrations';

export interface Training {
  exercise?: Exercise;
  date: number;
  duration: number;
  quota: [number, number];
}

export interface Exercise {
  id: string;
  trainings: Training[];
}

export class TrainingJournal {
  @observable
  public exercises!: Exercise[];
  private static key = 'exercises';
  private static versionKey = 'db_version';
  private static version = 'v2';

  constructor() {
    runInAction(() => (this.exercises = []));
    this.load();

    autorun(() => {
      this.save(this.exercisesToPersist);
    });
  }

  @action
  private load(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedExercises = JSON.parse(
        localStorage.getItem(TrainingJournal.key) || '[]'
      );
      const storedVersion = localStorage.getItem(TrainingJournal.versionKey);
      const exercises = migrate(
        storedVersion,
        TrainingJournal.version,
        storedExercises
      );
      this.exercises.splice(0, this.exercises.length, ...exercises);
      this.exercises.forEach(exercise => {
        exercise.trainings.forEach(training => {
          training.exercise = exercise;
        });
      });
    } else {
      this.exercises.splice(0, this.exercises.length);
    }
  }

  @computed
  private get exercisesToPersist(): string {
    return JSON.stringify(
      this.exercises.map(exercise => {
        return {
          ...exercise,
          trainings: exercise.trainings.map(training => {
            return {
              ...training,
              exercise: undefined,
            };
          }),
        };
      })
    );
  }

  @action
  public save(data: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(TrainingJournal.versionKey, TrainingJournal.version);
      localStorage.setItem(TrainingJournal.key, data);
    }
  }

  public exerciseTrainingTime(id: Exercise['id']): number {
    const exercise = this.exercises.find(e => e.id === id);
    if (!exercise) {
      return 0;
    }
    return exercise.trainings.reduce(
      (total, training) => total + training.duration,
      0
    );
  }

  public totalTrainingTime(): number {
    return this.exercises.reduce(
      (total, exercise) => total + this.exerciseTrainingTime(exercise.id),
      0
    );
  }

  public exerciseQuota(id: Exercise['id']): [number, number] {
    const exercise = this.exercises.find(e => e.id === id);
    if (!exercise) {
      return [0, 0];
    }
    const [hits, misses] = exercise.trainings
      .filter(t => t.quota[0] + t.quota[1] > 0)
      .reduce(
        ([hits, misses], { quota: [th, tm] }) => [hits + th, misses + tm],
        [0, 0]
      );

    return [hits, misses];
  }

  @action
  public addTraining(id: Exercise['id'], training: Training): void {
    let exercise = this.exercises.find(e => e.id === id);
    if (exercise) {
      exercise.trainings.push(training);
    } else {
      exercise = { id, trainings: [training] };
      this.exercises.push(exercise);
    }
    training.exercise = exercise;
  }

  @computed
  public get lastExercises(): Exercise[] {
    return this.exercises
      .slice()
      .sort((a, b) => {
        const lastTraining = (ex: Exercise) =>
          Math.max(...ex.trainings.map(training => training.date));
        return lastTraining(a) > lastTraining(b) ? 1 : -1;
      })
      .reverse();
  }
}
