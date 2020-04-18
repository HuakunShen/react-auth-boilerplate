import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios';

const TestSession = () => {
  const [msg, setMsg] = useState<string | null>(null);
  const [loggedin, setLogin] = useState<boolean>(false);
  const testSubmit = () => {
    setMsg(null);
    Axios.get('/api/users/test-session')
      .then((res) => {
        console.log(res.data);
        setMsg('You Are Logged In');
        setLogin(true);
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        setLogin(false);
        setMsg(err.response.data);
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      });
  };
  return (
    <div
      className="test-session-page"
      style={{
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#191919',
      }}
    >
      {msg ? (
        loggedin ? (
          <Alert severity="success">{msg}</Alert>
        ) : (
          <Alert severity="error">{msg}</Alert>
        )
      ) : null}

      <button
        style={{
          color: 'white',
          marginTop: '40vh',
          background: 'none',
          border: '2px solid #3498db',
          borderRadius: '24px',
          padding: '1em 2em',
        }}
        onClick={testSubmit}
      >
        Test Session
      </button>
    </div>
  );
};

export default TestSession;
