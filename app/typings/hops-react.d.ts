declare module 'hops' {
  export class Miss extends React.Component<any, any> {}

  export interface RenderOptions<Props> {
    Component: React.ComponentType<Props>;
    error: boolean;
    loading: boolean;
  }

  export interface ImportComponentOptions<Props> {
    loader?: () => any;
    render: (options: RenderOptions<Props> & Props) => React.ReactNode;
  }

  export function importComponent<Props, Exports>(
    load: () => Promise<{ default: React.ComponentType<Props> }>
  ): React.ComponentType<ImportComponentOptions<Props> & Props>;

  export function importComponent<Props, Exports>(
    load: () => Promise<Exports>,
    resolver: (exports: Exports) => React.ComponentType<Props>
  ): React.ComponentType<ImportComponentOptions<Props> & Props>;

  export interface StatusProps {
    code?: number;
  }
  export class Status extends React.Component<StatusProps, any> {}

  export function render<P>(
    reactElement: React.ReactElement<P>,
    options: any
  ): Promise<void>;
}
