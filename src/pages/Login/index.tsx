import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useDispatch, useSelector } from 'react-redux';
import { loginAPI, selectUserState, UserState } from 'redux/modules/user';
import { show } from 'redux/modules/snackBar';

import useInput from 'hooks/useInput';
import { Button, Form, Input, Loader } from 'components/@shared';
import { PageLayout } from 'components';

import { SignupWrapper } from './styles';

function Login() {
  const { isLoggedIn, loading, error }: UserState = useSelector(selectUserState);
  const [id, onChangeId] = useInput();
  const [password, onChangePassword] = useInput();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitLoginForm = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      loginAPI(id, password, () => {
        dispatch(show('✅ 로그인 되었습니다.'));
      })
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(routes.home);
    }
  }, [isLoggedIn]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <h1>로그인</h1>
      <Form onSubmit={onSubmitLoginForm}>
        <Input htmlFor="login-id" label="아이디" value={id} onChange={onChangeId} />
        <Input
          type="password"
          htmlFor="login-password"
          label="비밀번호"
          value={password}
          onChange={onChangePassword}
          minLength={8}
          maxLength={20}
        />
        <Button borderRaius="15px">확인</Button>
      </Form>
      <SignupWrapper>
        아직 회원이 아니신가요? <Link to={routes.signup}>회원가입</Link>
      </SignupWrapper>
    </PageLayout>
  );
}

export default Login;
