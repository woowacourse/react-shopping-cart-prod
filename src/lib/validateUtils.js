const isUserId = (value) =>
  /^([0-9a-zA-Z_\\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/g.test(value);

const isUserPassword = (value) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/g.test(value);

const isPasswordConfirm = (password, passwordConfirm) => password === passwordConfirm;

const isNickname = (value) => /^[a-zA-Z가-힣0-9]{2,10}$/g.test(value);

export { isUserId, isUserPassword, isPasswordConfirm, isNickname };
