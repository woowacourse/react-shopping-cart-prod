export const isInvalidEmail = (email) =>
  !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    email,
  );

export const isInvalidPassword = (password) =>
  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

export const isInvalidName = (name) => /\d+|\s+/.test(name);

export const isEmpty = (value) => !value;

export const checkName = (name) => {
  if (isEmpty(name)) {
    throw new Error('이름을 입력해줘!');
  }

  if (isInvalidName(name)) {
    throw new Error('이름에 숫자가 들어가면 안돼!');
  }
};

export const checkEmail = (email) => {
  if (isEmpty(email)) {
    throw new Error('이메일을 입력해줘!');
  }

  if (isInvalidEmail(email)) {
    throw new Error('이메일이 이상해!');
  }
};

export const checkPassword = (password) => {
  if (isEmpty(password)) {
    throw new Error('비밀번호를 입력해줘!');
  }

  if (isInvalidPassword(password)) {
    throw new Error(
      `비밀번호는 8자 이상의 문자와 숫자 조합으로 이루어져 있어!`,
    );
  }
};

export const checkPasswordConfirmation = (password, passwordConfirmation) => {
  if (isEmpty(passwordConfirmation)) {
    throw new Error('비밀번호 확인을 입력해줘!');
  }

  if (password !== passwordConfirmation) {
    throw new Error('비밀번호와 비밀번호 확인이 일치하지 않아!');
  }
};
