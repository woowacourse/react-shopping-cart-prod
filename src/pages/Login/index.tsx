import { Link, useNavigate } from 'react-router-dom';
import routes from 'routes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from 'redux/modules/user';

import useInput from 'hooks/useInput';
import { Button, Form, Input } from 'components/@shared';
import { PageLayout } from 'components';

import { setCookie } from 'utils';
import { SignupWrapper } from './styles';

function Login() {
  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/login', { userName: id, password });
      setCookie('accessToken', data);

      dispatch(login());
      navigate(routes.home);
    } catch (error) {
      alert('아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다!');
    }
  };

  return (
    <PageLayout>
      <h1>로그인</h1>
      <Form onSubmit={onSubmit}>
        <Input htmlFor="login-id" label="아이디" value={id} onChange={onChangeId} />
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
