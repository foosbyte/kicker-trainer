declare module 'hops-react' {
  export class Miss extends React.Component<any, any> {}

  export interface StatusProps {
    code?: number;
  }
  export class Status extends React.Component<StatusProps, any> {}

  export function render<P>(
    reactElement: React.ReactElement<P>,
    options: any
  ): Promise<void>;
}
