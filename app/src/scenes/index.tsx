import { Miss } from 'hops-react';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Categories } from './categories';
import { Exercises } from './exercises';
import { Profile } from './profile';
import { Stats } from './stats';
import { Training } from './training';

export interface ScenesProps {
  location?: object;
}

export class Scenes extends React.PureComponent<ScenesProps> {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/exercises/:category" component={Exercises} />
        <Route exact path="/training/:id" component={Training} />
        <Route exact path="/stats" component={Stats} />
        <Miss />
      </Switch>
    );
  }
}
