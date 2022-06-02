const { LOGIN_USER, LOGOUT_USER } = require('redux/actions/auth.action');

const initialState = {
  accessToken: '',
  name: '',
  email: '',
  address: '',
  phone: '',
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}

export default auth;
