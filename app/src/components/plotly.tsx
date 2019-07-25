import * as React from 'react';

type Props = import('react-plotly.js').PlotParams;

type PlotlyComponent = React.ComponentType<Props>;

export interface PlotlyLineChartProps {
  title: string;
  x: string[];
  y: number[] | number[][];
  legend?: string | string[];
}

export interface PlotlyLineChartState {
  PlotlyComponent?: PlotlyComponent;
}

export class PlotlyLineChart extends React.Component<
  PlotlyLineChartProps,
  PlotlyLineChartState
> {
  public state: PlotlyLineChartState = {};

  public async componentDidMount(): Promise<void> {
    const [PlotlyLib, scatter, factory] = await Promise.all([
      import('plotly.js/lib/core'),
      // @ts-ignore
      import('plotly.js/lib/scatter'),
      import('react-plotly.js/factory'),
    ]);

    // note: PlotlyLib has not typed the register method
    // therefore we cast to any here
    (PlotlyLib as any).register([scatter]);

    this.setState({ PlotlyComponent: factory.default(PlotlyLib) });
  }

  public render(): JSX.Element | null {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !this.state.PlotlyComponent
    ) {
      return null;
    }

    const { title, x, y, legend } = this.props;

    const data: Props['data'] = Array.isArray(y[0])
      ? [
          ...(y as number[][]).map(
            (set, i) =>
              ({
                x,
                y: set,
                type: 'scatter',
                name: legend ? legend[i] : undefined,
              } as const)
          ),
        ]
      : [
          {
            x,
            y,
            type: 'scatter',
            name: legend as string,
          },
        ];

    return (
      <this.state.PlotlyComponent
        config={{
          displaylogo: false,
          editable: false,
          displayModeBar: false,
          responsive: true,
          staticPlot: true,
        }}
        data={data}
        layout={{ autosize: true, title: { text: title } }}
        useResizeHandler
        style={{ width: '90%', height: '50%', margin: '0 auto' }}
      />
    );
  }
}
