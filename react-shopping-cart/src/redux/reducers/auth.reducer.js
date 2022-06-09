const { LOGIN_USER, LOGOUT_USER } = require('redux/actions/auth.action');

const initialState = {
  accessToken: '',
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return { accessToken: action.payload.toString() };
    }
    case LOGOUT_USER:
      return { accessToken: '' };
    default:
      return state;
  }
}

export default auth;
