import React, { Component } from 'react';
import '../stylesheets/Signin.scss';
import Alert from '@material-ui/lab/Alert';
import { ServerResponse } from '../interfaces/axios';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Loader from './Loader';
import $ from 'jquery';
import Axios from 'axios';

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {};

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {};

type IState = {
  msg: string | null;
  loggedIn: boolean;
  clickCount: number;
  timer: any;
};

class Signin extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      msg: null,
      loggedIn: false,
      clickCount: 0,
      timer: null,
    };
  }

  multipleClickEvent = () => {
    // detect multiple click
    if (!this.state.timer) {
      this.setState({ clickCount: this.state.clickCount + 1 }, () => {
        this.setState({
          timer: setTimeout(() => {
            let dest: null | string = null;
            if (this.state.clickCount === 3) {
              // triple click detected
              dest = '/';
            } else if (this.state.clickCount === 4) {
              // quadraple click detected
              dest = '/signup';
            }
            this.setState({ clickCount: 0 });
            this.setState({ timer: null });
            if (dest) this.props.history.push(dest);
          }, 500),
        });
      });
    } else {
      this.setState({ clickCount: this.state.clickCount + 1 });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.multipleClickEvent);
    console.log(
      '%c Triple Click to go to home page ',
      'background: #222; color: #bada55'
    );
    console.log(
      '%c Quadraple Click to go to sign up page ',
      'background: #222; color: #bada55'
    );
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.multipleClickEvent);
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
      <div className='signin-page'>
        {this.state.msg ? (
          this.state.loggedIn ? (
            <Alert variant='filled' severity='success'>
              {this.state.msg}
            </Alert>
          ) : (
            <Alert variant='filled' severity='error'>
              {this.state.msg}
            </Alert>
          )
        ) : null}
        <Loader />
        <div className='container'>
          <form className='box' onSubmit={this.submit}>
            <h1>Sign In</h1>
            <input type='text' name='username' placeholder='Username' />
            <input type='password' name='password' placeholder='Password' />
            <input type='submit' name='login' value='Login' />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Signin);
