export const AUTH = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const INITIAL_STATE = {
  isLogined: false,
};

Object.freeze(INITIAL_STATE);

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH.LOGIN: {
      return {isLogined: true};
    }

    case AUTH.LOGOUT: {
      return {isLogined: false};
    }

    default:
      return state;
  }
}
