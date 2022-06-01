const memberValidate = {
  userId: (value) => /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/g.test(value),
  password: (value) =>
    /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$/g.test(value),
  nickname: (value) => /^(?=.*[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ])[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/g.test(value),
};

export { memberValidate };
