'use strict';
/* global __webpack_modules__, __webpack_require__ */
/* tslint:disable */

declare const __webpack_modules__: any;
declare const __webpack_require__: any;

const { createElement, Component } = require('react');
const { default: withRouter } = require('react-router-dom/es/withRouter');

declare interface RenderOptions<Props> {
  Component: React.ComponentType<Props>;
  error: boolean;
  loading: boolean;
}

declare interface ImportComponentOptions<Props> {
  loader?: () => any;
  render: (options: RenderOptions<Props> & Props) => React.ReactNode;
}

// @ts-ignore
export function importComponent<Props, Exports>(
  load: () => Promise<Exports>,
  resolver: (exports: Exports) => React.ComponentType<Props>
): React.ComponentType<ImportComponentOptions<Props> & Props>;

// @ts-ignore
export function importComponent({ load, moduleId }, name): any {
  const Importer = withRouter(
    class Importer extends Component {
      // @ts-ignore
      constructor({ staticContext }) {
        super();
        if (staticContext) {
          staticContext.modules.push(moduleId);
        }
        if (staticContext || __webpack_modules__[moduleId]) {
          this.state = { Component: name(__webpack_require__(moduleId)) };
        } else {
          this.state = { loading: true };
        }
      }
      componentDidMount() {
        const { loader } = this.props;
        const { loading } = this.state;
        if (loading) {
          const state = { Component: null, error: null, loading: false };
          Promise.resolve()
            .then(() => (loader ? loader(load) : load()))
            .then(
              ns => this.setState({ ...state, Component: name(ns) }),
              error => this.setState({ ...state, error })
            );
        }
      }
      render() {
        const {
          // @ts-ignore
          render = ({ Component, error, loading, ...props }) => {
            return !(error || loading) ? createElement(Component, props) : null;
          },
          ownProps,
        } = this.props;
        return render({ ...ownProps, ...this.state });
      }
    }
  );
  // @ts-ignore
  return function Import({ loader, render, ...ownProps }) {
    return createElement(Importer, { loader, render, ownProps });
  };
}
