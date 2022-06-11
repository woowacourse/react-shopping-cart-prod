import CustomError from './CustomError';
import { ERROR_MESSAGE_FROM_SERVER } from './constants';

export const validateEmail = (email: string) => {
  if (!email.includes('@') || !email.includes('.', email.indexOf('@'))) {
    throw new CustomError(2101, ERROR_MESSAGE_FROM_SERVER[2101], 400);
  }

  if (email.length !== email.trim().length) {
    throw new CustomError(2101, ERROR_MESSAGE_FROM_SERVER[2101], 400);
  }
};

export const validatePassword = (password: string) => {
  const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  if (!passwordRule.test(password)) {
    throw new CustomError(2103, ERROR_MESSAGE_FROM_SERVER[2103], 400);
  }
};

export const validateNickname = (nickname: string) => {
  if (nickname.length < 2 || nickname.length > 10) {
    throw new CustomError(2102, ERROR_MESSAGE_FROM_SERVER[2102], 400);
  }
};
