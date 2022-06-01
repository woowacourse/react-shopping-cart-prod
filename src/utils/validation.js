export const isInvalidEmail = (email) =>
  !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
    email,
  );

export const isInvalidPassword = (password) =>
  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

export const checkEmail = (email) => {
  if (isInvalidEmail(email)) {
    throw new Error('이메일이 이상해!');
  }
};

export const checkPassword = (password) => {
  if (isInvalidPassword(password)) {
    throw new Error(
      `비밀번호는 8자 이상의 문자와 숫자 조합으로 이루어져 있어!`,
    );
  }
};
