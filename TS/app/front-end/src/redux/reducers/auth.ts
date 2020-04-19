import { LOAD_AUTH, CLEAR_AUTH, AuthActionType } from '../actions/actionTypes';

const auth = (state = { isAuthenticated: false }, action: AuthActionType) => {
  switch (action!.type) {
    case LOAD_AUTH:
      return action!.auth;
    case CLEAR_AUTH:
      return { isAuthenticated: false }; // clear user/auth, set space to empty object
    default:
      return state;
  }
};

export default auth;
