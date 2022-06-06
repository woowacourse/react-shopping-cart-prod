import actionTypes from './user.actions';

const initialState = {
  accessToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOKEN:
      return {
        ...state,
        accessToken: action.data,
      };
    case actionTypes.DELETE_TOKEN:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default userReducer;
