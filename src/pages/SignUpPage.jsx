import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import { validSignUpInfo } from '../utils/validations';

import { MESSAGE, ROUTES_PATH, SERVER_PATH, USER, USER_INFO_KEY } from '../constants';
function SignUpPage() {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const handleUserInfoChange = useUserForm(setSignUpInfo);
  const { email, nickname, password, passwordConfirm } = signUpInfo;

  const handleSignUpInfoSubmit = async (e) => {
    e.preventDefault();

    try {
      validSignUpInfo(signUpInfo);
      await axios.post(SERVER_PATH.USER, { email, nickname, password });
      alert(MESSAGE.SIGN_UP_SUCCESS);
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <StyledUserContainer>
      <h1>회원가입</h1>
      <StyledUserForm onSubmit={handleSignUpInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          value={email}
          onChange={handleUserInfoChange(USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="닉네임"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleUserInfoChange(USER_INFO_KEY.NICKNAME)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleUserInfoChange(USER_INFO_KEY.PASSWORD)}
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={passwordConfirm}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleUserInfoChange(USER_INFO_KEY.PASSWORD_CONFIRM)}
        />
        <Button text="가입하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default SignUpPage;
