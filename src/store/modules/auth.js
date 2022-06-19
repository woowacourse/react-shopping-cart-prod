export const AUTH = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_USER_INFO: 'SET_USER_INFO',
  EDIT_USER_INFO: 'EDIT_USER_INFO',
};

const INITIAL_STATE = {
  nickname: '',
  userInfo: {},
  isLogin: false,
};

Object.freeze(INITIAL_STATE);

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH.SET_USER_INFO: {
      return {...state, nickname: action.payload.nickname, userInfo: action.payload};
    }
    case AUTH.EDIT_USER_INFO: {
      return {
        ...state,
        nickname: action.payload.nickname,
        userInfo: {...state.userInfo, ...action.payload},
      };
    }
    case AUTH.LOGIN: {
      return {...state, isLogin: true};
    }

    case AUTH.LOGOUT: {
      localStorage.removeItem('accessToken');
      return {...state, isLogin: false};
    }

    default:
      return state;
  }
}
