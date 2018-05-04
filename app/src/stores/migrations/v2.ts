import { Exercise } from '../training-journal';

const deleted = [
  '2bar-backpin-bottom',
  '2bar-bank-top',
  '2bar-push-shot',
  '3bar-snake-center',
  '3bar-pin-center',
  '3bar-pull-shot',
  '5bar-brush-bottom',
  '5bar-stick-bottom',
];

export function v2(exercises: Exercise[]): Exercise[] {
  return exercises.filter(exercise => !deleted.includes(exercise.id));
}
