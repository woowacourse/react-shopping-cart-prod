import { actionTypes } from './user.actions';

const initialState = {
  accessToken: null,
  isLoading: false,
  isError: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOKEN:
    case actionTypes.DELETE_TOKEN:
    case actionTypes.KEEP_TOKEN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.ADD_TOKEN_ERROR:
    case actionTypes.DELETE_TOKEN_ADD_TOKEN_ERROR:
    case actionTypes.KEEP_TOKEN_ADD_TOKEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case actionTypes.ADD_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        isLoading: false,
        isError: false,
      };
    case actionTypes.DELETE_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: null,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default userReducer;
