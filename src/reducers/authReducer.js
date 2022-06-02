import { AUTH_ACTIONS } from 'actions/action';

const initState = { nickname: '', isAuthenticated: false };

function authReducer(state = initState, action) {
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
}

export default authReducer;
