import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.scss';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TestSession from './components/TestSession';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/test-session" component={TestSession} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
