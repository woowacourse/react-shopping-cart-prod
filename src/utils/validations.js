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

export { isValidNickname, isValidEmail, isValidPassword, isValidPasswordConfirm };
