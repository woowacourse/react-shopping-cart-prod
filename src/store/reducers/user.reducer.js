const token = window.sessionStorage.getItem('token');
const nickname = window.sessionStorage.getItem('nickname');

const initialState = {
  nickname: token && nickname ? nickname : null,
  isLoggedIn: token && nickname,
  isLoading: false,
};

export const userActionType = {
  START: 'user/ACTION_START',
  FAIL: 'user/ACTION_FAIL',
  UPDATE: 'user/UPDATE',
  DELETE: 'user/DELETE',
  LOGOUT: 'user/LOGOUT',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.START:
      return {
        ...state,
        isLoading: true,
      };

    case userActionType.UPDATE:
      return {
        ...state,
        nickname: action.payload.nickname,
        isLoggedIn: true,
        isLoading: false,
      };

    case userActionType.FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case userActionType.LOGOUT:
    case userActionType.DELETE:
      return {
        ...state,
        nickname: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default userReducer;
