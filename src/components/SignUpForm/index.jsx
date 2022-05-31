import React from 'react';

import Input from 'components/Input';

import Button from 'styles/Button';

import Wrapper from './style';

const SignUpForm = ({
  title,
  userName,
  email,
  password,
  passwordConfirmation,
}) => {
  return (
    <Wrapper>
      <p className="title">{title}</p>
      <div className="input-wrapper">
        <Input label="이름" type="text" value={userName} placeholder="이름" />
      </div>
      <div className="input-wrapper">
        <Input label="이메일" type="email" value={email} placeholder="이메일" />
      </div>
      <div className="password-wrapper">
        <Input
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호"
        />
        <Input
          type="password"
          value={passwordConfirmation}
          placeholder="비밀번호 확인"
        />
      </div>
      <Button>{title}</Button>
    </Wrapper>
  );
};

export default SignUpForm;
