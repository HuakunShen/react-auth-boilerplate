import React, { Component } from 'react';
import '../stylesheets/home.scss';
import axios from 'axios';
class Home extends Component {
  state = { msg: null, isLogin: false };
  testSession = () => {
    axios
      .get('/api/users/test-session')
      .then(res => {
        console.log(res.data);
        const msg = res.data.user ? 'You are logged in' : 'You are not logged in';
        const isLogin = res.data.user !== undefined;
        this.setState({ msg, isLogin });
        setTimeout(() => {
          this.setState({ msg: null });
        }, 5000);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="home-page">
        {this.state.msg ? (
          <div className={`alert alert-${this.state.isLogin ? 'success' : 'danger'}`} role="alert">
            {this.state.msg}
          </div>
        ) : null}

        <div className="container-fluid">
          <h1>Home Page</h1>
          <button className="btn btn-primary" onClick={this.testSession}>
            Test Session
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
