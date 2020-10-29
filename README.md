# Foosbyte Kicker Trainer

[![Build Status](https://dev.azure.com/bjoernjohannes/foosbyte-trainer/_apis/build/status/foosbyte.kicker-trainer?branchName=master)](https://dev.azure.com/bjoernjohannes/foosbyte-trainer/_build/latest?definitionId=2&branchName=master)

This is a PWA (progressive web app) for tracking your foosball training progress.

Visit it on [trainer.nerdlabs.it](https://trainer.nerdlabs.it). _Please be aware that this is still a work in progress_

## Developing

This application is built with [Hops](https://github.com/xing/hops) and uses React.js, TypeScript, styled-components and mobx.

### Installation

Clone this repository and run:

```shell
yarn install
```

### Useful commands

```shell
yarn start
```

Will start the application in development mode which includes HMR (hot module replacement) on the server- and on the client-side.
The app will start an express.js server on port 8080.

```shell
yarn build
```

Will do a single build and write the output into the `./app/dist` folder.
To do a production build call `yarn build -p`.
There are some other potentially interesting options:

- `yarn build --fast-build` will disable transpiling of all node_modules and switch the [`useBuiltins`](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) option of the `@babel/preset-env` from `usage` to `entry`.
- `yarn build --no-parallel-build` will run both webpack builds (server & client) in the main thread. Leaving it on will fork the compilers into separate child processes to parallelize the work and also to have more memory available for each process.
