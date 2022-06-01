const initialState = {
  nickname: null,
  isLoggedIn: false,
  isLoading: false,
};

export const userActionType = {
  START: 'user/ACTION_START',
  FAIL: 'user/ACTION_FAIL',
  UPDATE: 'user/UPDATE',
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

    default:
      return state;
  }
};

export default userReducer;
