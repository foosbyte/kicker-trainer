import { Exercise } from '../training-journal';
import { v1 } from './v1';
import { v2 } from './v2';

const migrations = [
  { version: null, migrate: null },
  { version: 'v1', migrate: v1 },
  { version: 'v2', migrate: v2 },
];

export function migrate(
  previousVersion: string | null,
  newVersion: string,
  exercises: Exercise[]
): Exercise[] {
  const migrationsToApply = migrations.slice(
    migrations.findIndex(({ version }) => previousVersion === version) + 1,
    migrations.findIndex(({ version }) => newVersion === version) + 1
  );

  return migrationsToApply.reduce(
    (exercises, { migrate }) =>
      typeof migrate === 'function' ? migrate(exercises) : exercises,
    exercises
  );
}
