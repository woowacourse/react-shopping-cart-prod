import { useState } from 'react';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUserForm from '../hooks/useUserForm';
import useUser from '../hooks/useUser';

import { USER, USER_INFO_KEY, MESSAGE } from '../constants';

const initialState = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
};

function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState(initialState);
  const handleUserInfoChange = useUserForm(setSignUpInfo);
  const { userSignUp } = useUser();
  const { email, nickname, password, passwordConfirm } = signUpInfo;

  const handleSignUpInfoSubmit = (e) => {
    e.preventDefault();
    userSignUp(signUpInfo);
  };

  return (
    <StyledUserContainer>
      <h1>회원가입</h1>
      <StyledUserForm onSubmit={handleSignUpInfoSubmit}>
        <Input
          labelText="이메일"
          type="email"
          placeholder={MESSAGE.EMAIL_PLACEHOLDER}
          value={email}
          onChange={handleUserInfoChange(USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="닉네임"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          placeholder={MESSAGE.NICKNAME_PLACEHOLDER}
          value={nickname}
          onChange={handleUserInfoChange(USER_INFO_KEY.NICKNAME)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={password}
          placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
          onChange={handleUserInfoChange(USER_INFO_KEY.PASSWORD)}
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={passwordConfirm}
          placeholder={MESSAGE.PASSWORD_PLACEHOLDER}
          onChange={handleUserInfoChange(USER_INFO_KEY.PASSWORD_CONFIRM)}
        />
        <Button text="가입하기" />
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default SignUpPage;
