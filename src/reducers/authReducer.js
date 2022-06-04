import { AUTH_ACTIONS } from 'actions/action';

const initState = { isLoading: true, nickname: '', isAuthenticated: false };

function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        isLoading: false,
        nickname: action.nickname,
        isAuthenticated: true,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isLoading: false,
        nickname: '',
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

export default authReducer;
