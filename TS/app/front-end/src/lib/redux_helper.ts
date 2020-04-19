import axios from 'axios';
import { changeAuth } from '../redux/actions';
import {
  LOAD_AUTH,
  CLEAR_AUTH,
  reduxStateType,
} from '../redux/actions/actionTypes';

import { dispatchType } from '../redux/configureStore';

export const mapStateToProps = (state: reduxStateType) => ({
  auth: state.auth,
});

export const loadAuth = (dispatch: dispatchType) => {
  axios
    .get('/api/users/load_auth')
    .then((res) => {
      const auth = res.data;
      dispatch(
        changeAuth(LOAD_AUTH, Object.assign(auth, { isAuthenticated: true }))
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (dispatch: dispatchType) => {
  axios
    .post('/api/users/logout')
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log('error: ', err);
    });
  dispatch(changeAuth(CLEAR_AUTH, null));
};

export const mapDispatchToProps = (dispatch: dispatchType) => {
  return {
    loadAuth: () => loadAuth(dispatch),
    logout: () => logout(dispatch),
  };
};
