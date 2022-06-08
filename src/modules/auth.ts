// @ts-nocheck

// actions
const AUTH_ACTIONS = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

// action creator
const doLogin = ({ nickname }) => ({ type: AUTH_ACTIONS.LOGIN, nickname });
const doLogout = () => ({ type: AUTH_ACTIONS.LOGOUT });

// reducer
const initState = { nickname: '', isAuthenticated: false };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        nickname: action.nickname,
        isAuthenticated: true,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        nickname: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
export { doLogin, doLogout };
