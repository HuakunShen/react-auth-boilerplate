import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound404 from './components/NotFound404';
import '@fortawesome/fontawesome-free/css/all.css';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './lib/redux_helper';

const App = (props) => {
  useEffect(() => {
    props.loadAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/*" component={NotFound404} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
