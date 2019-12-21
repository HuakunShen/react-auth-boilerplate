import React, { Component } from 'react';
import '../stylesheets/home.scss';
import axios from 'axios';
class Home extends Component {
  state = {};
  testSession = () => {
    axios
      .get('/api/users/test-session')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="home-page">
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
