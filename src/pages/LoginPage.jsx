import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { StyledUserContainer, StyledUserForm } from '../components/common/Styled';

import useUser from '../hooks/useUser';
import useUserForm from '../hooks/useUserForm';
import { validLoginInfo } from '../utils/validations';

import { USER_INFO_KEY } from '../constants';

function LoginPage() {
  const { signIn } = useUser();
  const {
    state: loginInfo,
    setState: setLoginInfo,
    handleUserInfoChange,
  } = useUserForm({
    email: '',
    password: '',
  });
  const { email, password } = loginInfo;

  const handleLoginInfoSubmit = (e) => {
    e.preventDefault();

    try {
      validLoginInfo(email);
      signIn(email, password);
    } catch (error) {
      alert(error.message);
    }
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
          onChange={handleUserInfoChange(setLoginInfo, USER_INFO_KEY.EMAIL)}
        />
        <Input
          labelText="비밀번호"
          type="password"
          value={password}
          placeholder="영문자(대,소), 숫자, 특수기호 조합을 입력하세요"
          onChange={handleUserInfoChange(setLoginInfo, USER_INFO_KEY.PASSWORD)}
        />
        <Button>로그인</Button>
      </StyledUserForm>
    </StyledUserContainer>
  );
}

export default LoginPage;
