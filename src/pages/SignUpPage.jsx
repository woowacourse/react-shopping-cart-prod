import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import {
  isValidPassword,
  isValidPasswordConfirm,
  isValidEmail,
  isValidNickname,
} from '../utils/validations';

import { MESSAGE, ROUTES_PATH, SERVER_PATH, USER, USER_INFO_KEY } from '../constants';

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
      await axios.post(SERVER_PATH.USER, { email, nickname, password });
      alert('회원가입 성공');
      navigate(ROUTES_PATH.LOGIN);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUpInfoChange = (signUpInfoKey) => (e) => {
    setSignUpInfo((prevState) => {
      return { ...prevState, [signUpInfoKey]: e.target.value };
    });
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
          onChange={handleSignUpInfoChange(USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="닉네임"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleSignUpInfoChange(USER_INFO_KEY.NICKNAME)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleSignUpInfoChange(USER_INFO_KEY.PASSWORD)}
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={passwordConfirm}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleSignUpInfoChange(USER_INFO_KEY.PASSWORD_CONFIRM)}
        />
        <Button text="가입하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default SignUpPage;
