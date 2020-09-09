import { Exercise } from '../training-journal';

export function v1(exercises: Exercise[]): Exercise[] {
  exercises.forEach((exercise) => {
    exercise.trainings.forEach((training) => {
      // we previously stored a Date instance, but now store miliseconds
      training.date = new Date(training.date).getTime();
      // quota wasn't present before, so we initialize it with zero
      training.quota = Array.isArray(training.quota) ? training.quota : [0, 0];
    });
  });
  return exercises;
}
