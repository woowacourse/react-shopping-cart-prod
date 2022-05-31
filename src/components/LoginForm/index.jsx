import React, { useCallback, useState } from 'react';

import Input from 'components/Input';
import Button from 'styles/Button';

import Wrapper, { SignUpLink } from './styles';

import { checkEmail, checkPassword } from 'utils/validation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = useCallback(({ target }) => {
    setEmail(target.value);
  }, []);

  const handlePasswordChange = useCallback(({ target }) => {
    setPassword(target.value);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      checkEmail(email);
      checkPassword(password);
      setError('');
    } catch ({ message }) {
      setError(message);
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
        />
      </div>
      <div className="input-wrapper">
        <Input
          label="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호"
          onChange={handlePasswordChange}
        />
      </div>
      <div className="link-wrapper">
        <SignUpLink to="/signUp">회원가입</SignUpLink>
      </div>
      {error && (
        <div className="error-wrapper">
          <p>{error}</p>
        </div>
      )}
      <Button>로그인</Button>
    </Wrapper>
  );
};

export default LoginForm;
