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
  public data: { [B in Bars]: Exercise[] } = {
    [Bars['1bar']]: [],
    [Bars['2bar']]: [
      {
        bars: {
          blue: {
            [Bars['1bar']]: 0,
            [Bars['2bar']]: 50,
            [Bars['3bar']]: 0,
            [Bars['5bar']]: 0,
          },
          red: {
            [Bars['1bar']]: 0,
            [Bars['2bar']]: 0,
            [Bars['3bar']]: 0,
            [Bars['5bar']]: 0,
          },
        },
        id: '2bar-backpin-bottom',
        name: 'Backpin (unten)',
        arrows: [
          {
            start: { x: 200, y: -410 },
            end: { x: 50, y: -410 },
          },
          {
            start: { x: 40, y: -390 },
            end: { x: 40, y: 500 },
          },
        ],
      },
      {
        id: '2bar-bank-top',
        name: 'Bande (oben)',
      },
      {
        id: '2bar-push-shot',
        name: 'Schieber',
      },
    ],
    [Bars['3bar']]: [
      {
        id: '3bar-snake-center',
        name: 'Jet Mitte',
      },
      {
        id: '3bar-pin-center',
        name: 'Pin Mitte',
      },
      {
        id: '3bar-pull-shot',
        name: 'Zieher',
      },
    ],
    [Bars['5bar']]: [
      {
        id: '5bar-chip-bottom',
        name: 'Kantenpass (unten)',
      },
      {
        id: '5bar-brush-bottom',
        name: 'Brush (unten)',
      },
      {
        id: '5bar-stick-bottom',
        name: 'Stickpass (unten)',
      },
    ],
  };

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
