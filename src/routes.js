import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Projects from './components/Projects';
import NewProject from './components/Projects/NewProject';

export default function() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute path="/projects/new" component={NewProject} />
    </Switch>
  );
}
