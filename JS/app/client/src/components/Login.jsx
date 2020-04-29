import React, { Component } from 'react';
import '../stylesheets/login.scss';
import $ from 'jquery';
import axios from 'axios';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../lib/redux_helper';
import Navbar from './Navbar';

class Login extends Component {
  state = { err_msg: null };

  login = (event) => {
    event.preventDefault();
    console.log('Submit Login Request');
    axios
      .post('/api/users/login', {
        username: $('#username').val(),
        password: $('#password').val(),
      })
      .then((res) => {
        console.log(res.data);
        this.props.loadAuth();
      })
      .catch((err) => {
        console.log('error');
        console.log(err);
        console.log(err.response);
        this.setState({ err_msg: err.response.data.error });
        setTimeout(() => {
          this.setState({ err_msg: null });
        }, 5000);
      });
  };

  render() {
    return (
      <div className="login-page">
        <Navbar />
        {this.state.err_msg ? (
          <div className="alert alert-danger" role="alert">
            {this.state.err_msg}
          </div>
        ) : null}
        <div className="container-fluid">
          <form className="mx-auto" onSubmit={this.login}>
            <h2>Login</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
