const validateUserName = (id: string) => {
  const reg = /^[a-z0-9\_]{5,20}$/;

  if (!id.match(reg)) {
    throw new Error('아이디는 영문 소문자/숫자/언더바(_)만 사용할 수 있습니다. (5~20자)');
  }
};

const validatePassword = (password: string) => {
  const reg = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,20}';

  if (!password.match(reg)) {
    throw new Error(
      '비밀번호는 영문 대문자/소문자/숫자/특수문자(!, @, #, $, %, ^, &, *, -, _)를 각 1자 이상 포함해야 합니다. (8~20자)'
    );
  }
};

export { validateUserName, validatePassword };
