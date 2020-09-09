/* tslint:disable */
import { importComponent, Miss } from 'hops';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

const Profile = importComponent(
  () => import('./profile'),
  (ns) => ns.Profile
);
const Categories = importComponent(
  () => import('./categories'),
  (ns) => ns.Categories
);
const Exercises = importComponent(
  () => import('./exercises'),
  (ns) => ns.Exercises
);
const Training = importComponent(
  () => import('./training'),
  (ns) => ns.Training
);
const Stats = importComponent(
  () => import('./stats'),
  (ns) => ns.Stats
);
const Settings = importComponent(
  () => import('./settings'),
  (ns) => ns.Settings
);
const Editor = importComponent(
  () => import('./editor'),
  (ns) => ns.Editor
);

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
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/editor" component={Editor} />
        <Miss />
      </Switch>
    );
  }
}
