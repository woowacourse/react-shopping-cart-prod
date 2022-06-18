export const emailValidator = (email) => {
  const pattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (!pattern.test(email)) {
    return { isValid: false, errorMessage: "이메일 형식을 지켜주세요." };
  }

  return { isValid: true, errorMessage: "" };
};

export const usernameValidator = (username) => {
  const pattern = /^.{1,10}$/;

  if (!pattern.test(username)) {
    return {
      isValid: false,
      errorMessage: "이름은 1 ~ 10자 이내로 입력해 주세요.",
    };
  }

  return { isValid: true, errorMessage: "" };
};

export const passwordValidator = (password) => {
  const pattern = /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (!pattern.test(password)) {
    return {
      isValid: false,
      errorMessage: "영문,숫자,특수문자의 조합으로 8 ~ 12글자를 입력해 주세요.",
    };
  }

  return { isValid: true, errorMessage: "" };
};

export const confirmPasswordValidator = (password) => (confirmPassword) => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: "비밀번호를 동일하게 입력해 주세요.",
    };
  }

  return { isValid: true, errorMessage: "" };
};
