// Action Types
const AUTH_ACTIONS = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

// Initial State
const initState = { isLoading: true, nickname: '', isAuthenticated: false };

// Action Creators
export const loginComplete = ({ nickname }) => ({ type: AUTH_ACTIONS.LOGIN, nickname });
export const logoutComplete = () => ({ type: AUTH_ACTIONS.LOGOUT });

// Reducers
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
