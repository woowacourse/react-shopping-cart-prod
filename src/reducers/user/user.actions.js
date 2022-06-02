export const actionTypes = {
  INITIALIZE_USER_INFO: 'INITIALIZE_USER_INFO',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  UPDATE_NAME: 'UPDATE_NAME',
};

export const initializeUserInfo = () => ({
  type: actionTypes.INITIALIZE_USER_INFO,
});

export const setUserInfo = (payload) => ({
  type: actionTypes.SET_USER_INFO,
  payload,
});

export const setAuthenticated = (payload) => ({
  type: actionTypes.SET_AUTHENTICATED,
  payload,
});

export const updateName = (payload) => ({
  type: actionTypes.UPDATE_NAME,
  payload,
});
