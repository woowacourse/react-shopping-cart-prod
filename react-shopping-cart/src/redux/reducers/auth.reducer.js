const { LOGIN_USER, LOGOUT_USER } = require('redux/actions/auth.action');

const initialState = {
  accessToken: '',
  name: '',
  email: '',
  address: '',
  phoneNumber: {
    first: '',
    second: '',
  },
};

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      const { phone, ...rest } = action.payload;
      const phoneNumbers = phone.split('-');
      const phoneNumber = {
        first: phoneNumbers[1],
        second: phoneNumbers[2],
      };
      return { phoneNumber, ...rest };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}

export default auth;
