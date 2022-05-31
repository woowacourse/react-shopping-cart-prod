import { useState } from 'react';
import styled from 'styled-components';

import Button from '../components/common/Button';
import Input from '../components/common/Input';

import { isValidEmail } from '../utils/validations';

import { MESSAGE } from '../constants';

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginInfo;

  const handleLoginInfoSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert(MESSAGE.ERROR_EMAIL);
      return;
    }

    alert('로그인 성공 로직 추가하기');
  };

  const handleLoginInfoChange = (loginInfoKey) => (e) => {
    setLoginInfo((pre) => {
      return { ...pre, [loginInfoKey]: e.target.value };
    });
  };

  return (
    <StyledLoginContainer>
      <h1 style={{ marginBottom: '40px' }}>로그인</h1>
      <StyledLoginForm onSubmit={handleLoginInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleLoginInfoChange('email')}
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleLoginInfoChange('password')}
        />
        <Button text="로그인" />
      </StyledLoginForm>
    </StyledLoginContainer>
  );
}

const StyledLoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 44px 80px;
  margin: 0px auto 100px;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default LoginPage;
