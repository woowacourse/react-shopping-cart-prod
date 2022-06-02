import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PASSWORD_CHECK,
  SET_ADDRESS,
  SET_NAME,
  SET_PHONE_NUMBER,
} from 'redux/actions/userInfo.action';

import {
  isInvalidAddress,
  isInvalidEmail,
  isInvalidName,
  isInvalidPassword,
  isInvalidPhoneNumber,
} from 'utils/validators';

const initialState = {
  email: { value: '', error: false },
  password: { value: '', error: false },
  passwordCheck: { value: '', error: false },
  name: { value: '', error: false },
  address: { value: '', error: false },
  phoneNumber: {
    first: '',
    second: '',
  },
};

function userInfo(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL: {
      const { email } = action.payload;
      const error = email ? isInvalidEmail(email) : false;

      return { ...state, email: { value: email, error } };
    }
    case SET_PASSWORD: {
      const { password } = action.payload;
      const error = password ? isInvalidPassword(password) : false;

      return { ...state, password: { value: password, error } };
    }
    case SET_PASSWORD_CHECK: {
      const { passwordCheck } = action.payload;
      const error = passwordCheck ? passwordCheck !== state.password.value : false;

      return { ...state, passwordCheck: { value: passwordCheck, error } };
    }
    case SET_ADDRESS: {
      const { address } = action.payload;
      const error = address ? isInvalidAddress(address) : false;

      return { ...state, address: { value: address, error } };
    }
    case SET_NAME: {
      const { name } = action.payload;
      const error = name ? isInvalidName(name) : false;

      return { ...state, name: { value: name, error } };
    }
    case SET_PHONE_NUMBER: {
      const { numberPlace, phoneNumber } = action.payload;

      return { ...state, phoneNumber: { ...state.phoneNumber, [numberPlace]: phoneNumber } };
    }
    default:
      return state;
  }
}

export default userInfo;
