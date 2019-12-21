import React, { Component } from 'react';
import '../stylesheets/register.scss';
import $ from 'jquery';
import axios from 'axios';

class Register extends Component {
  state = { err_msg: null, username_error: null, email: null, password_error: null };

  register = event => {
    event.preventDefault();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    // check input
    let error = false;
    if (username.length < 4) {
      this.setState({ username_error: 'username must have more than 4 characters' });
      error = true;
    }
    if (password.length < 4) {
      this.setState({ password_error: 'password must have more than 4 characters' });
      error = true;
    }
    if (error) return;

    console.log('Submit Register');
    axios
      .post('/api/users', {
        username,
        email,
        password,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error.response);
        this.setState({
          err_msg: error.response.data.message,
        });
        setTimeout(() => {
          this.setState({ err_msg: null });
        }, 5000);
      });
  };

  inputOnChange = event => {
    if (event.target.id === 'username') {
      this.setState({ username_error: null });
    }
    if (event.target.id === 'emial') {
      this.setState({ email_error: null });
    }
    if (event.target.id === 'password') {
      this.setState({ password_error: null });
    }
  };

  render() {
    return (
      <div className="register-page">
        {this.state.err_msg ? (
          <div className="alert alert-danger" role="alert">
            {this.state.err_msg}
          </div>
        ) : null}
        <div className="container-fluid">
          <form className="mx-auto" onSubmit={this.register}>
            <h2>Register</h2>
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${this.state.username_error ? 'is-invalid' : null}`}
                id="username"
                placeholder="Username"
                required
                onChange={this.inputOnChange}
              />
              <div className="invalid-feedback">{this.state.username_error}</div>
            </div>

            <div className="form-group">
              <input
                type="email"
                className={`form-control ${this.state.email_error ? 'is-invalid' : null}`}
                id="email"
                placeholder="Email"
                required
                onChange={this.inputOnChange}
              />
              <div className="invalid-feedback">{this.state.email_error}</div>
            </div>
            <div className="form-group">
              <input
                type="password"
                className={`form-control ${this.state.password_error ? 'is-invalid' : null}`}
                id="password"
                placeholder="Password"
                required
                onChange={this.inputOnChange}
              />
              <div className="invalid-feedback">{this.state.password_error}</div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
