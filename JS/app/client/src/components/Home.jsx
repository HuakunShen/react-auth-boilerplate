import React, { useState } from 'react';
import '../stylesheets/home.scss';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Navbar from './Navbar';
const Home = (props) => {
  const [msg, setMsg] = useState(null),
    [success, setSuccess] = useState(false);
  const test_session = () => {
    axios
      .get('/api/users/test-session')
      .then((res) => {
        setSuccess(true);
        setMsg('You are logged in');
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      })
      .catch((err) => {
        setSuccess(false);
        setMsg('You are not logged in');
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      });
  };
  return (
    <div className="home-page">
      <Navbar />

      {msg && (
        <Alert variant="filled" severity={success ? 'success' : 'error'}>
          {msg}
        </Alert>
      )}

      <div className="container">
        <h1>Home</h1>
        <button className="btn btn-primary" onClick={test_session}>
          Test Session
        </button>
      </div>
    </div>
  );
};

// class Home extends Component {
//   state = { msg: null, isLogin: false };
//   testSession = () => {
//     axios
//       .get('/api/users/test-session')
//       .then(res => {
//         console.log(res.data);
//         const msg = res.data.user ? 'You are logged in' : 'You are not logged in';
//         const isLogin = res.data.user !== undefined;
//         this.setState({ msg, isLogin });
//         setTimeout(() => {
//           this.setState({ msg: null });
//         }, 5000);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   render() {
//     return (
//       <div className="home-page">
//         {this.state.msg ? (
//           <div className={`alert alert-${this.state.isLogin ? 'success' : 'danger'}`} role="alert">
//             {this.state.msg}
//           </div>
//         ) : null}

//         <div className="container-fluid">
//           <h1>Home Page</h1>
//           <button className="btn btn-primary" onClick={this.testSession}>
//             Test Session
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

export default Home;
