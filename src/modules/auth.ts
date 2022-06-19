// @ts-nocheck

// actions
const AUTH_ACTIONS = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  FINISHED: 'auth/FINISHED',
  CHANGE_NICKNAME: 'auth/CHANGE_NICKNAME',
};

// action creator
const doLogin = ({ nickname }) => ({ type: AUTH_ACTIONS.LOGIN, nickname });
const doLogout = () => ({ type: AUTH_ACTIONS.LOGOUT });
const doFinish = () => ({ type: AUTH_ACTIONS.FINISHED });
const doChangeNickname = ({ nickname }) => ({ type: AUTH_ACTIONS.CHANGE_NICKNAME, nickname });

// reducer
const initState = { nickname: '', isAuthenticated: false, isLoading: true };

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.FINISHED:
      return {
        ...state,
        isLoading: false,
      };

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

    case AUTH_ACTIONS.CHANGE_NICKNAME:
      return {
        ...state,
        nickname: action.nickname,
      };

    default:
      return state;
  }
};

export default authReducer;
export { doLogin, doLogout, doFinish, doChangeNickname };
