// tslint:disable no-duplicate-imports
declare module 'hops-react/dom' {
  import { BrowserRouterProps } from 'react-router-dom';

  export interface Options {
    mountpoint?: string;
    router?: BrowserRouterProps;
  }

  export class ReactContext {
    public options: Options;
    public constructor(options?: Options);
    public bootstrap(): Promise<void>;
    public enhanceElement<P1, P2>(
      reactElement: React.ReactElement<P1>
    ): Promise<React.ReactElement<P2>>;
    public getMountpoint(): Element | null;
  }

  export function render<P>(
    reactElement: React.ReactElement<P>,
    context: ReactContext
  ): () => Promise<void>;
}

declare module 'hops-react/node' {
  // tslint:disable-next-line no-implicit-dependencies
  import { Request as ExpressRequest, RequestHandler } from 'express';
  import { HelmetData } from 'react-helmet';
  import { StaticRouterProps } from 'react-router';

  export interface Assets {
    css: string[];
    js: string[];
  }

  export interface TemplateData {
    options: Options;
    helmet: HelmetData;
    assets: Assets;
    manifest: string;
    globals: GlobalValue[];
  }

  export interface GlobalValue {
    name: string;
    value: any; // tslint:disable-line no-any
  }

  export interface Options {
    request?: Request;
    router?: StaticRouterProps;
    template?(data: TemplateData): string;
  }

  export class ReactContext {
    public options: Options;
    public constructor(options?: Options);
    public bootstrap(): Promise<void>;
    public enhanceElement<P1, P2>(
      reactElement: React.ReactElement<P1>
    ): Promise<React.ReactElement<P2>>;
    public getTemplateData<P>(
      templateData: Partial<TemplateData>,
      rootElement: React.ReactElement<P>
    ): Promise<TemplateData>;
    public renderTemplate(templateData: TemplateData): string;
  }

  export function render<P>(
    reactElement: React.ReactElement<P>,
    context: ReactContext
  ): RequestHandler;
}

declare module 'hops-react' {
  // tslint:disable-next-line no-implicit-dependencies
  import { Request, RequestHandler } from 'express';
  import {
    Options as DomOptions,
    ReactContext as DomContext,
  } from 'hops-react/dom';
  import {
    Options as NodeOptions,
    ReactContext as NodeContext,
    TemplateData,
  } from 'hops-react/node';

  export { ReactContext as DomContext } from 'hops-react/dom';
  export { ReactContext as NodeContext, TemplateData } from 'hops-react/node';

  export type Options = DomOptions & NodeOptions;

  // Technically the Context only implements one of DomContext or NodeContext
  // depending on where this is used. We need the combination of both though,
  // because the Context of hops-redux extends this Context and does not
  // differentiate between node and dom.
  export interface ReactContext extends DomContext, NodeContext {
    options: Options;
  }

  export class ReactContext implements ReactContext {}

  export function createContext(options?: Options): ReactContext;

  interface PartialContextConstructor<O extends Options> {
    new (options?: O): Partial<ReactContext>;
  }

  export interface ContextConstructor<O extends Options> {
    new (options?: O): ReactContext;
  }

  export function combineContexts<
    O1 extends Options,
    O2 extends Options,
    O3 extends Options
  >(
    Context1: PartialContextConstructor<O1>,
    Context2: PartialContextConstructor<O2>,
    Context3?: PartialContextConstructor<O3>
  ): (option?: O1 & O2 & O3) => ReactContext;

  export class Miss extends React.Component<any, any> {}

  export interface StatusProps {
    code?: number;
  }
  export class Status extends React.Component<StatusProps, any> {}

  export function render<P>(
    reactElement: React.ReactElement<P>,
    context: ReactContext
  ): RequestHandler | (() => Promise<void>);
}
