export const userId = (id) => {
  const checkIdReg = /^[a-zA-Z0-9]{4,20}$/;
  return checkIdReg.test(id);
};
export const userPassword = (password) => {
  const checkPasswordReg = /^(?=.*[!@#$%^*]{1,20})(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  return checkPasswordReg.test(password);
};

export const userNickName = (nickName) => nickName.length >= 1 && nickName.length <= 20;

export const userAge = (age) => Number(age) > 0 && Number(age) <= 200;
