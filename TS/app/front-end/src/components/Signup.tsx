import React, { Component } from 'react';
import '../stylesheets/Signup.scss';
import axios from 'axios';
import { ServerResponse } from '../interfaces/axios';
import Alert from '@material-ui/lab/Alert';

type Istate = {
  usernameRef: any;
  emailRef: any;
  passwordRef: any;
  errMsg: string | null;
};

export default class Signup extends Component<{}, Istate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      usernameRef: React.createRef(),
      emailRef: React.createRef(),
      passwordRef: React.createRef(),
      errMsg: null,
    };
  }

  submit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    this.setState({ errMsg: null });
    const username = this.state.usernameRef.current.value;
    const email = this.state.emailRef.current.value;
    const password = this.state.passwordRef.current.value;
    if (!(username && email && password)) {
      this.setState({ errMsg: 'All Fields Must Be Filled In' }, () =>
        setTimeout(() => this.setState({ errMsg: null }), 5000)
      );
      return;
    }
    try {
      const res = await axios.post<ServerResponse>('/api/users/', {
        username,
        email,
        password,
      });
      console.log(res.data);
    } catch (error) {
      if (error.response.data.message)
        this.setState({ errMsg: error.response.data.message }, () =>
          setTimeout(() => this.setState({ errMsg: null }), 5000)
        );
    }
  };

  render() {
    return (
      <div className="signup-page">
        {this.state.errMsg && (
          <Alert variant="filled" severity="error">
            {this.state.errMsg}
          </Alert>
        )}

        <div className="container">
          <form className="box" onSubmit={this.submit}>
            <h1>Sign Up</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              ref={this.state.usernameRef}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={this.state.emailRef}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={this.state.passwordRef}
            />
            <input type="submit" name="signup" value="Sign Up" />
          </form>
        </div>
      </div>
    );
  }
}
