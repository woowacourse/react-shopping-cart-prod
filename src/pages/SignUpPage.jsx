import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

import Input from '../components/common/Input';
import Button from '../components/common/Button';

import {
  isValidPassword,
  isValidPasswordConfirm,
  isValidEmail,
  isValidNickname,
} from '../utils/validations';

import { MESSAGE, ROUTES_PATH, SERVER_PATH, USER } from '../constants';

function SignUpPage() {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const { email, nickname, password, passwordConfirm } = signUpInfo;

  const handleSignUpInfoSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert(MESSAGE.ERROR_EMAIL);
      return;
    }
    if (!isValidNickname(nickname)) {
      alert(MESSAGE.ERROR_NICKNAME);
      return;
    }
    if (!isValidPassword(password)) {
      alert(MESSAGE.ERROR_PASSWORD);
      return;
    }
    if (!isValidPasswordConfirm(password, passwordConfirm)) {
      alert(MESSAGE.ERROR_PASSWORD_CONFIRM);
      return;
    }

    try {
      const userInfo = { ...signUpInfo };
      delete userInfo.passwordConfirm;
      await axios.post(`${SERVER_PATH.USER}`, { userInfo });
      alert('회원가입 성공');
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUpInfoChange = (signUpInfoKey) => (e) => {
    setSignUpInfo((pre) => {
      return { ...pre, [signUpInfoKey]: e.target.value };
    });
  };

  return (
    <StyledSignUpContainer>
      <h1 style={{ marginBottom: '40px' }}>회원가입</h1>
      <StyledSignUpForm onSubmit={handleSignUpInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleSignUpInfoChange('email')}
        />
        <Input
          labelText="닉네임"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleSignUpInfoChange('nickname')}
        />
        <Input
          labelText="비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleSignUpInfoChange('password')}
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={passwordConfirm}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleSignUpInfoChange('passwordConfirm')}
        />
        <Button text="가입하기" />
      </StyledSignUpForm>
    </StyledSignUpContainer>
  );
}

const StyledSignUpContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  padding: 44px 80px;
  margin: 0px auto 100px;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledSignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default SignUpPage;
