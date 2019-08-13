import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Projects from './components/Projects';
import NewProject from './components/Projects/NewProject';
import EditProject from './components/Projects/EditProject';
import Tasks from './components/Tasks';
import NewTask from './components/Tasks/NewTask';
import EditTask from './components/Tasks/EditTask';

export default function() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={Home} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute exact path="/projects/new" component={NewProject} />
      <PrivateRoute exact path="/projects/:id" component={EditProject} />
      <PrivateRoute exact path="/projects/:projectId/tasks" component={Tasks} />
      <PrivateRoute exact path="/projects/:projectId/tasks/new" component={NewTask} />
      <PrivateRoute path="/projects/:projectId/tasks/:id" component={EditTask} />

    </Switch>
  );
}
