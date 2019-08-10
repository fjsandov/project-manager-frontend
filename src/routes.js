import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';

export default function() {
  return (
    <Switch>
      <Route exact path="/" >
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={Home} />
    </Switch >
  );
}