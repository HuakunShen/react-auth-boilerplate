import React, { Component } from 'react';
import '../stylesheets/Signup.scss';
import axios from 'axios';
import { ServerResponse } from '../interfaces/axios';
import Alert from '@material-ui/lab/Alert';
import Loader from './Loader';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

type Istate = {
  usernameRef: any;
  emailRef: any;
  passwordRef: any;
  errMsg: string | null;
  clickCount: number;
  timer: any;
};

// Type whatever you expect in 'this.props.match.params.*'
type PathParamsType = {};

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {};

class Signup extends Component<PropsType, Istate> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      usernameRef: React.createRef(),
      emailRef: React.createRef(),
      passwordRef: React.createRef(),
      errMsg: null,
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
              dest = '/signin';
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
      '%c Quadraple Click to go to sign in page ',
      'background: #222; color: #bada55'
    );
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.multipleClickEvent);
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
      <div className='signup-page'>
        {this.state.errMsg && (
          <Alert variant='filled' severity='error'>
            {this.state.errMsg}
          </Alert>
        )}
        <Loader />
        <div className='container'>
          <form className='box' onSubmit={this.submit}>
            <h1>Sign Up</h1>
            <input
              type='text'
              name='username'
              placeholder='Username'
              ref={this.state.usernameRef}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              ref={this.state.emailRef}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='off'
              ref={this.state.passwordRef}
            />
            <input type='submit' name='signup' value='Sign Up' />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Signup);
