import { RANGE } from "constants";

const isOverMaxLength = (value, max) => {
  return value.length > max;
};

const isUnderMinLength = (value, min) => {
  return value.length < min;
};

const checkEmail = (value) => {
  if (value.includes(" ")) {
    throw new Error("이메일에 공백이 없어야 합니다.");
  }
  if (
    isOverMaxLength(value, RANGE.EMAIL_MAX_LENGTH) ||
    isUnderMinLength(value, RANGE.EMAIL_MIN_LENGTH)
  ) {
    throw new Error(
      `이메일은 ${RANGE.EMAIL_MIN_LENGTH}자 이상, ${RANGE.EMAIL_MAX_LENGTH}자 이하여야 합니다.`
    );
  }
};

export const checkUsername = (value) => {
  if (value.includes(" ")) {
    throw new Error("닉네임에 공백이 없어야 합니다.");
  }
  if (
    isOverMaxLength(value, RANGE.USERNAME_MAX_LENGTH) ||
    isUnderMinLength(value, RANGE.USERNAME_MIN_LENGTH)
  ) {
    throw new Error(
      `닉네임은 ${RANGE.USERNAME_MIN_LENGTH}자 이상 ${RANGE.USERNAME_MAX_LENGTH}자 이하여야 합니다.`
    );
  }
};

const checkPassword = (value) => {
  if (value.includes(" ")) {
    throw new Error("비밀번호에 공백이 없어야 합니다.");
  }
  if (
    isOverMaxLength(value, RANGE.PW_MAX_LENGTH) ||
    isUnderMinLength(value, RANGE.PW_MIN_LENGTH)
  ) {
    throw new Error(
      `비밀번호는 ${RANGE.PW_MIN_LENGTH}자 이상 ${RANGE.PW_MAX_LENGTH}자 이하여야 합니다.`
    );
  }
};

export const registerValidator = {
  email: checkEmail,
  username: checkUsername,
  password: checkPassword,
};
