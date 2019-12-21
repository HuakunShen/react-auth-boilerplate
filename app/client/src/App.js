import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
