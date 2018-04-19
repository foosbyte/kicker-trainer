export enum Bars {
  '2bar' = '2bar',
  '3bar' = '3bar',
  '5bar' = '5bar',
}

export class S3 {
  public data = {
    [Bars['2bar']]: [
      {
        id: '2bar-backpin-bottom',
        name: 'Backpin (unten)',
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
}
