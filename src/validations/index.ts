import { MESSAGES } from 'constants/index';

const validatePassword = (password: string) => {
  const reg = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_])[A-Za-z0-9!@#$%^&*-_]{8,16}';

  if (!password.match(reg)) {
    throw new Error(MESSAGES.INVALID_PASSWORD);
  }
};

export { validatePassword };
