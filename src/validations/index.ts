import { ERROR_MESSAGES } from '@/constants';

const validateUserName = (id: string) => {
  const reg = /^[a-z0-9\_]{5,20}$/;

  if (!id.match(reg)) {
    throw new Error(ERROR_MESSAGES.SIGNUP.USER_NAME_RULE);
  }
};

const validatePassword = (password: string) => {
  const reg = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,20}';

  if (!password.match(reg)) {
    throw new Error(ERROR_MESSAGES.SIGNUP.PASSWORD_RULE);
  }
};

export { validateUserName, validatePassword };
