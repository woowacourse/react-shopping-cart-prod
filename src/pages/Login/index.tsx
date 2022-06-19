import { Link, useNavigate } from 'react-router-dom';
import routes from '@/routes';

import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/modules/user';

import useInput from '@/hooks/useInput';

import { SignupWrapper } from './styles';

import { Button, Form, Input } from '@/components/@shared';
import { PageLayout } from '@/components';

import { loginAPI } from '@/apis/user';
import { setCookie } from '@/utils';

function Login() {
  const { value: userName, onChangeValue: onChangeUserName } = useInput();
  const { value: password, onChangeValue: onChangePassword } = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = await loginAPI(userName, password);

    if (!accessToken) return;

    dispatch(loginUser());
    setCookie('accessToken', accessToken);
    navigate(routes.home);
  };

  return (
    <PageLayout>
      <h1>로그인</h1>
      <Form onSubmit={onSubmit}>
        <Input
          htmlFor="login-user-name"
          label="아이디"
          value={userName}
          onChange={onChangeUserName}
        />
        <Input
          type="password"
          htmlFor="login-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          maxLength={20}
        />
        <Button>확인</Button>
      </Form>
      <SignupWrapper>
        아직 회원이 아니신가요? <Link to={routes.signup}>회원가입</Link>
      </SignupWrapper>
    </PageLayout>
  );
}

export default Login;
