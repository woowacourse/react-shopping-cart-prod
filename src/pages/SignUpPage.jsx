import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUser from '../hooks/useUser';
import useUserForm from '../hooks/useUserForm';
import { validSignUpInfo } from '../utils/validations';

import { USER, USER_INFO_KEY } from '../constants';

function SignUpPage() {
  const { signUp } = useUser();
  const {
    state: signUpInfo,
    setState: setSignUpInfo,
    handleUserInfoChange,
  } = useUserForm({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const { email, nickname, password, passwordConfirm } = signUpInfo;

  const handleSignUpInfoSubmit = (e) => {
    e.preventDefault();

    try {
      validSignUpInfo(signUpInfo);
      signUp(email, nickname, password);
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
          onChange={handleUserInfoChange(setSignUpInfo, USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="닉네임"
          minLength={USER.NICKNAME.MIN}
          maxLength={USER.NICKNAME.MAX}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={handleUserInfoChange(setSignUpInfo, USER_INFO_KEY.NICKNAME)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={password}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setSignUpInfo, USER_INFO_KEY.PASSWORD)}
        />
        <Input
          labelText="비밀번호 확인"
          type="password"
          minLength={USER.PASSWORD.MIN}
          maxLength={USER.PASSWORD.MAX}
          value={passwordConfirm}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setSignUpInfo, USER_INFO_KEY.PASSWORD_CONFIRM)}
        />
        <Button>가입하기</Button>
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default SignUpPage;
