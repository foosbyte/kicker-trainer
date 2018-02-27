declare module 'hops-styled-components/browser' {
  import { Options as ReactOptions } from 'hops-react/dom';
  import { ThemeProviderProps } from 'styled-components';

  export interface Options {
    theme?: ThemeProviderProps.theme;
  }

  export class StyledComponentsContext {
    public options: Options & ReactOptions;
    public constructor(options?: Options & ReactOptions);
    public enhanceElement<P1, P2>(
      reactElement: React.ReactElement<P1>,
    ): Promise<React.ReactElement<P2>>;
  }
}

declare module 'hops-styled-components/node' {
  import { Options, TemplateData } from 'hops-react/node';
  export { Options } from 'hops-react/node';

  export class StyledComponentsContext {
    public options: Options;
    public constructor(options?: Options);
    public enhanceElement<P1, P2>(
      reactElement: React.ReactElement<P1>,
    ): Promise<React.ReactElement<P2>>;
    public renderTemplate(templateData: TemplateData): string;
  }
}

declare module 'hops-styled-components' {
  import {
    Options as DomOptions,
    StyledComponentsContext as DomContext,
  } from 'hops-styled-components/browser';
  import {
    Options as NodeOptions,
    StyledComponentsContext as NodeContext,
  } from 'hops-styled-components/node';
  import { Options as ReactOptions, ReactContext } from 'hops-react';

  export type Options = DomOptions & NodeOptions;

  export interface StyledComponentsContext extends DomContext, NodeContext {
    options: Options;
  }

  export class StyledComponentsContext implements StyledComponentsContext {}

  export function createContext(options?: Options & ReactOptions): ReactContext;
}
