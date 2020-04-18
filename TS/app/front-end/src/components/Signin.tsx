import React, { Component } from 'react';
import '../stylesheets/Signin.scss';
import Alert from '@material-ui/lab/Alert';
import { ServerResponse } from '../interfaces/axios';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import $ from 'jquery';
import Axios from 'axios';

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {};

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {};

type IState = { msg: string | null; loggedIn: boolean };

class Signin extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      msg: null,
      loggedIn: false,
    };
  }

  submit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ msg: null });
    const username = $('input[name="username"]').val();
    const password = $('input[name="password"]').val();
    if (!(username && password)) {
      this.setState({ msg: 'All Fields Must Be Filled In' }, () =>
        setTimeout(() => this.setState({ msg: null }), 5000)
      );
      return;
    }
    Axios.post<ServerResponse>('/api/users/login', {
      username,
      password,
    })
      .then((res: any) => {
        this.setState({ msg: res.data, loggedIn: true }, () =>
          setTimeout(
            () =>
              this.setState({ msg: null }, () =>
                this.props.history.push('/test-session')
              ),
            3000
          )
        );
      })
      .catch((err) => {
        this.setState({ msg: err.response.data });
        setTimeout(() => {
          this.setState({ msg: null });
        }, 5000);
      });
  };

  render() {
    return (
      <div className="signin-page">
        {this.state.msg ? (
          this.state.loggedIn ? (
            <Alert variant="filled" severity="success">
              {this.state.msg}
            </Alert>
          ) : (
            <Alert variant="filled" severity="error">
              {this.state.msg}
            </Alert>
          )
        ) : null}

        <div className="container">
          <form className="box" onSubmit={this.submit}>
            <h1>Sign In</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" name="login" value="Login" />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Signin);
