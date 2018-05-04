declare module 'react-chartkick' {
  import * as React from 'react';

  class ReactChartkick {
    static addAdapter(library: any): void;
  }
  export default ReactChartkick;

  export interface LineChartProps {
    data: { name: string; data?: { [date: string]: number } }[];
    xtitle?: string;
    ytitle?: string;
    min?: number;
    max?: number;
  }

  export class LineChart extends React.Component<LineChartProps> {}
}
