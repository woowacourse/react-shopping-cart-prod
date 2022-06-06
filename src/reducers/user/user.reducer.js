import { actionTypes } from 'reducers/user/user.actions';

const initialState = {
  authenticated: false,
  id: '',
  name: '',
  email: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  // INITIALIZE_USER_INFO
  if (type === `${actionTypes.INITIALIZE_USER_INFO}_PENDING`) return state;
  if (type === `${actionTypes.INITIALIZE_USER_INFO}_FULFILLED`) {
    return {
      ...state,
      authenticated: false,
      id: '',
      name: '',
      email: '',
    };
  }
  if (type === `${actionTypes.INITIALIZE_USER_INFO}_REJECTED`) return state;

  // SET_USER_INFO
  if (type === `${actionTypes.SET_USER_INFO}_PENDING`) return state;
  if (type === `${actionTypes.SET_USER_INFO}_FULFILLED`) {
    return {
      ...state,
      authenticated: true,
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
  if (type === `${actionTypes.SET_USER_INFO}_REJECTED`) return state;

  // SET_AUTHENTICATED
  if (type === `${actionTypes.SET_AUTHENTICATED}_PENDING`) return state;
  if (type === `${actionTypes.SET_AUTHENTICATED}_FULFILLED`) {
    return {
      ...state,
      authenticated: payload.authenticated,
    };
  }
  if (type === `${actionTypes.SET_AUTHENTICATED}_REJECTED`) return state;

  // UPDATE_NAME
  if (type === `${actionTypes.UPDATE_NAME}_PENDING`) return state;
  if (type === `${actionTypes.UPDATE_NAME}_FULFILLED`) {
    return {
      ...state,
      name: payload.name,
    };
  }
  if (type === `${actionTypes.UPDATE_NAME}_REJECTED`) return state;

  return state;
};

export default userReducer;
