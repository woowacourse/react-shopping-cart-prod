import { authClient } from 'apis';
import AuthPage from 'components/common/AuthPage';
import LabeledInput from 'components/common/LabeledInput';
import useInput from 'hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from 'Routers';
import styled from 'styled-components';
import type { LoginResponse } from 'types/domain';

const Login = () => {
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();
  const navigate = useNavigate();

  const onSubmitAuthForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signInResponse = await authClient.post<LoginResponse>('/login', {
      loginId: email,
      password,
    });

    if (signInResponse.status === 401) {
      throw new Error('로그인에 실패하였습니다');
    }
    const { accessToken, name } = signInResponse.data;

    localStorage.setItem('access-token', accessToken);
    alert(`${name}님 로그인 되었습니다.`);
    navigate(PATH.home);
  };

  return (
    <AuthPage
      title='로그인'
      onSubmitAuthForm={onSubmitAuthForm}
      bottom={
        <StyledBottom>
          아직 회원이 아니신가요? <StyledLink to='/signup'>회원가입</StyledLink>
        </StyledBottom>
      }
    >
      <LabeledInput
        label='이메일'
        id='email'
        type='email'
        placeholder='이메일 주소를 입력해주세요'
        value={email}
        onChange={onChangeEmail}
      />
      <LabeledInput
        label='비밀번호'
        id='password'
        type='password'
        placeholder='비밀번호를 입력해주세요'
        value={password}
        onChange={onChangePassword}
      />
    </AuthPage>
  );
};

export default Login;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.BLUE_38d};
  margin-left: 10px;
`;

const StyledBottom = styled.p`
  font-size: 15px;
  margin-top: 15px;
`;
