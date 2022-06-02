import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import axios from 'axios';

import Button from '../components/common/Button';
import Input from '../components/common/Input';

import { isValidEmail } from '../utils/validations';
import { MESSAGE, SERVER_PATH, ROUTES_PATH } from '../constants';

import actionTypes from '../store/user/user.actions';

const initialState = {
  email: '',
  password: '',
};

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState(initialState);
  const { email, password } = loginInfo;

  const handleLoginInfoSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert(MESSAGE.ERROR_EMAIL);
      return;
    }

    try {
      const { data } = await axios.post(SERVER_PATH.LOGIN, { email, password });
      const { accessToken } = data;
      dispatch({ type: actionTypes.ADD_TOKEN, accessToken });
      alert('로그인 성공');
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      setLoginInfo(initialState);
      alert(error);
    }
  };

  const handleLoginInfoChange = (loginInfoKey) => (e) => {
    setLoginInfo((prevState) => {
      return { ...prevState, [loginInfoKey]: e.target.value };
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
