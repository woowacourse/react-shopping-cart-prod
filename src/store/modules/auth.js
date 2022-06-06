export const AUTH = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const INITIAL_STATE = {
  isLogin: false,
  accessToken: '',
};

Object.freeze(INITIAL_STATE);

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN: {
      const accessToken = action.payload;
      return {isLogin: true, accessToken};
    }

    case AUTH.LOGOUT: {
      return {isLogin: false, accessToken: ''};
    }

    default:
      return state;
  }
}
