import { MESSAGE } from '../constants';

const isSpaces = (value) => {
  return value.replace(/ /g, '').length !== value.length;
};

const isValidNickname = (inputValue) => {
  const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,10}$/;
  return nameReg.test(inputValue);
};

const isValidEmail = (inputValue) => {
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  return emailReg.test(inputValue);
};

const isValidPassword = (inputValue) => {
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return passwordReg.test(inputValue);
};

const isValidPasswordConfirm = (password, passwordConfirm) => {
  return password === passwordConfirm;
};

const validLoginInfo = (email) => {
  if (!isValidEmail(email)) {
    throw new Error(MESSAGE.NOT_AN_EMAIL_FORMAT);
  }
};

const validPasswordInfo = (password, passwordConfirm) => {
  if (isSpaces(password)) {
    throw new Error(MESSAGE.CAN_NOT_CONTAIN_SPACES);
  }
  if (!isValidPassword(password)) {
    throw new Error(MESSAGE.NOT_A_PASSWORD_FORMAT);
  }
  if (!isValidPasswordConfirm(password, passwordConfirm)) {
    throw new Error(MESSAGE.PASSWORD_DOES_NOT_MATCH);
  }
};

const validUserInfo = (nickname) => {
  if (!isValidNickname(nickname)) {
    throw new Error(MESSAGE.INCORRECT_NICKNAME);
  }
};

const validSignUpInfo = (signUpInfo) => {
  const { email, nickname, password, passwordConfirm } = signUpInfo;

  validLoginInfo(email);
  validUserInfo(nickname);
  validPasswordInfo(password, passwordConfirm);
};

export { validLoginInfo, validSignUpInfo, validPasswordInfo, validUserInfo };
