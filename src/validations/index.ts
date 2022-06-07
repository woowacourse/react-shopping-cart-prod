import { PASSWORD } from 'constants/index';

const validatePassword = (password: string) => {
  if (password.length < PASSWORD.MIN_LENGTH || password.length > PASSWORD.MAX_LENGTH) {
    throw new Error(`비밀번호는 ${PASSWORD.MIN_LENGTH}~${PASSWORD.MAX_LENGTH}자로 입력해주세요.`);
  }
};

export { validatePassword };
