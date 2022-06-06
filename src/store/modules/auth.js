export const AUTH = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const INITIAL_STATE = {
  isLogin: false,
};

Object.freeze(INITIAL_STATE);

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN: {
      return {isLogin: true};
    }

    case AUTH.LOGOUT: {
      localStorage.removeItem('accessToken');
      return {isLogin: false};
    }

    default:
      return state;
  }
}
