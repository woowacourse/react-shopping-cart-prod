import { useState } from 'react';

import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import useUser from '../hooks/useUser';

import { MESSAGE, USER_INFO_KEY } from '../constants';

const initialState = {
  email: '',
  password: '',
};

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState(initialState);
  const handleUserInfoChange = useUserForm(setLoginInfo);
  const { userLogin } = useUser();
  const { email, password } = loginInfo;

  const handleLoginInfoSubmit = (e) => {
    e.preventDefault();
    userLogin(loginInfo);
  };

  return (
    <StyledUserContainer>
      <h1>로그인</h1>
      <StyledUserForm onSubmit={handleLoginInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder={MESSAGE.EMAIL_PLACEHOLDER}
          value={email}
          onChange={handleUserInfoChange(USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={password}
          placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
          onChange={handleUserInfoChange(USER_INFO_KEY.PASSWORD)}
        />
        <Button text="로그인" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default LoginPage;
