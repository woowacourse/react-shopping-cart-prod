import CustomError from './CustomError';

export const validateEmail = (email: string) => {
  if (!email.includes('@') || !email.includes('.', email.indexOf('@'))) {
    throw new CustomError(2101, '올바른 이메일 형식을 입력해주세요.');
  }

  if (email.length !== email.trim().length) {
    throw new CustomError(2101, '공백없이 이메일을 적어주세요.');
  }
};

export const validatePassword = (password: string) => {
  const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  if (!passwordRule.test(password)) {
    throw new CustomError(
      2103,
      '비밀번호는 10자리 이상이며 영문, 숫자, 특수문자가 조합되어야 합니다.',
      400,
    );
  }
};

export const validateNickname = (nickname: string) => {
  if (nickname.length < 2 || nickname.length > 10) {
    throw new CustomError(2102, '닉네임은 2자리 이상 10자리 이하여야 합니다.');
  }
};
