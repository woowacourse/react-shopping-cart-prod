import { actionTypes } from 'reducers/user/user.actions';

const initialState = {
  authenticated: false,
  id: '',
  name: '',
  email: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  if (type === actionTypes.INITIALIZE_USER_INFO) {
    return {
      ...state,
      authenticated: false,
      id: '',
      name: '',
      email: '',
    };
  }
  if (type === actionTypes.SET_USER_INFO) {
    return {
      ...state,
      authenticated: true,
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
  if (type === actionTypes.SET_AUTHENTICATED) {
    return {
      ...state,
      authenticated: payload.authenticated,
    };
  }
  if (type === actionTypes.UPDATE_NAME) {
    return {
      ...state,
      name: payload.name,
    };
  }
  return state;
};

export default userReducer;
