import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_PASSWORD_CHECK,
  SET_ADDRESS,
  SET_NAME,
  SET_PHONE_NUMBER,
  SET_USER_INFO,
  RESET_USER_INFO,
  SET_EMAIL_DISABLED,
} from 'redux/actions/userInfo.action';

import {
  isInvalidAddress,
  isInvalidEmail,
  isInvalidName,
  isInvalidPassword,
  isInvalidPhone,
} from 'utils/validators';

export const initialUserInfoState = {
  email: { value: '', error: false },
  password: { value: '', error: false },
  passwordCheck: { value: '', error: false },
  name: { value: '', error: false },
  address: { value: '', error: false },
  phone: {
    first: '',
    second: '',
  },
};

function userInfo(state = initialUserInfoState, action) {
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
      const { numberPlace, phone } = action.payload;

      const error = phone ? isInvalidPhone(phone) : false;
      return { ...state, phone: { ...state.phone, [numberPlace]: phone, error } };
    }
    case SET_USER_INFO:
      return { ...action.payload.info };
    case RESET_USER_INFO:
      return { ...initialUserInfoState };
    case SET_EMAIL_DISABLED:
      return { ...state, email: { ...state.email, disabled: action.payload.disabled } };
    default:
      return state;
  }
}

export default userInfo;
