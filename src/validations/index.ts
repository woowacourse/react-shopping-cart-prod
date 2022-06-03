const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 20) {
    throw new Error('비밀번호는 8~20자로 입력해주세요.');
  }
};

export { validatePassword };
