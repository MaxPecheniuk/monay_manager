import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../Home/Home';

export class Application extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={'/'} component={Home}/>
      </Switch>
    );
  }
}
