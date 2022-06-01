import React, { useCallback, useState } from 'react';

import Input from 'components/Input';
import Button from 'styles/Button';

import Wrapper, { SignUpLink } from './styles';

import { checkEmail, checkPassword } from 'utils/validation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = useCallback(({ target }) => {
    setEmail(target.value);
  }, []);

  const handlePasswordChange = useCallback(({ target }) => {
    setPassword(target.value);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let canSubmit = true;

    try {
      checkEmail(email);
      setEmailError('');
    } catch ({ message }) {
      setEmailError(message);
      canSubmit = false;
    }

    try {
      checkPassword(password);
      setPasswordError('');
    } catch ({ message }) {
      setPasswordError(message);
      canSubmit = false;
    }
  };

  return (
    <Wrapper onSubmit={handleFormSubmit}>
      <p className="title">로그인</p>
      <div className="input-wrapper">
        <Input
          label="이메일"
          type="text"
          value={email}
          placeholder="이메일"
          onChange={handleEmailChange}
          isError={emailError}
        />
      </div>
      {emailError && (
        <div className="error-wrapper">
          <p>{emailError}</p>
        </div>
      )}
      <div className="input-wrapper">
        <Input
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          isError={passwordError}
        />
      </div>
      {passwordError && (
        <div className="error-wrapper">
          <p>{passwordError}</p>
        </div>
      )}
      <div className="link-wrapper">
        <SignUpLink to="/signUp">회원가입</SignUpLink>
      </div>
      <Button>로그인</Button>
    </Wrapper>
  );
};

export default LoginForm;
