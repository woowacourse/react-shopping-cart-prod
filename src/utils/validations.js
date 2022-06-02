import { MESSAGE } from '../constants';

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

// 각자 폼에 관련 validation

const validSignUpInfo = (signUpInfo) => {
  const { email, nickname, password, passwordConfirm } = signUpInfo;

  if (!isValidEmail(email)) {
    throw new Error(MESSAGE.ERROR_EMAIL);
  }
  if (!isValidNickname(nickname)) {
    throw new Error(MESSAGE.ERROR_NICKNAME);
  }
  if (!isValidPassword(password)) {
    throw new Error(MESSAGE.ERROR_PASSWORD);
  }
  if (!isValidPasswordConfirm(password, passwordConfirm)) {
    throw new Error(MESSAGE.ERROR_PASSWORD_CONFIRM);
  }
};

const validLoginInfo = (email) => {
  if (!isValidEmail(email)) {
    throw new Error(MESSAGE.ERROR_EMAIL);
  }
};

const validPasswordInfo = (passwordInfo) => {
  const { newPassword, newPasswordConfirm } = passwordInfo;

  if (!isValidPassword(newPassword)) {
    throw new Error(MESSAGE.ERROR_PASSWORD);
  }
  if (!isValidPasswordConfirm(newPassword, newPasswordConfirm)) {
    throw new Error(MESSAGE.ERROR_PASSWORD_CONFIRM);
  }
};

const validUserInfo = (userInfo) => {
  const { nickname } = userInfo;
  if (!isValidNickname(nickname)) {
    throw new Error(MESSAGE.ERROR_NICKNAME);
  }
};

export { validLoginInfo, validSignUpInfo, validPasswordInfo, validUserInfo };
