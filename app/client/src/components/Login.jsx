import React, { Component } from 'react';
import '../stylesheets/login.scss';
import $ from 'jquery';

class Login extends Component {
  state = {};

  login = event => {
    event.preventDefault();
    console.log('Submit Login Request');

    const data = {
      username: $('#username').val(),
      password: $('#password').val(),
    };
    const request = new Request('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    fetch(request)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        console.debug(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="login-page">
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

export default Login;
