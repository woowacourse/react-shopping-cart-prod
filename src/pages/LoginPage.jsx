import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import { isValidEmail } from '../utils/validations';
import { MESSAGE, SERVER_PATH, ROUTES_PATH, USER_INFO_KEY } from '../constants';
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
      alert(MESSAGE.LOGIN_SUCCESS);
      navigate(ROUTES_PATH.HOME);
    } catch (error) {
      setLoginInfo(initialState);
      alert(error.message);
    }
  };

  const handleLoginInfoChange = (loginInfoKey) => (e) => {
    setLoginInfo((prevState) => {
      return { ...prevState, [loginInfoKey]: e.target.value };
    });
  };

  return (
    <StyledUserContainer>
      <h1>로그인</h1>
      <StyledUserForm onSubmit={handleLoginInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleLoginInfoChange(USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleLoginInfoChange(USER_INFO_KEY.PASSWORD)}
        />
        <Button text="로그인" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default LoginPage;
