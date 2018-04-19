import { action, autorun, observable, runInAction } from 'mobx';

interface Training {
  date: Date;
  duration: number;
}

interface Exercise {
  id: string;
  trainings: Training[];
}

export class Storage {
  @observable private exercises!: Exercise[];
  private static key = 'exercises';

  constructor() {
    runInAction(() => {
      this.exercises = this.load();
    });

    autorun(() => {
      this.save(this.exercises);
    });
  }

  public load(): Exercise[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem(Storage.key) || '[]');
    }
    return [];
  }

  public save(exercises: Exercise[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(Storage.key, JSON.stringify(exercises));
    }
  }

  public totalTrainingTime(id: Exercise['id']): number {
    const exercise = this.exercises.find(e => e.id === id);
    if (!exercise) {
      return 0;
    }
    return exercise.trainings.reduce(
      (total, training) => total + training.duration,
      0
    );
  }

  @action
  public addTraining(id: Exercise['id'], training: Training): void {
    const exercise = this.exercises.find(e => e.id === id);

    if (exercise) {
      exercise.trainings.push(training);
    } else {
      this.exercises.push({ id, trainings: [training] });
    }
  }
}
