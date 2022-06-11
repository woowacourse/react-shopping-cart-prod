// @ts-nocheck
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import useAuth from 'hooks/db/useAuth';

import { Input, Title, GuideText, AuthButton, Container } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { doLogin } from 'modules/auth';
import { setCookie, getCookie } from 'utils/cookie';
import { PATHNAME, MESSAGE, SNACKBAR } from 'utils/constants';
import Styled from './index.style';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginAPI } = useAuth();
  const isAuthenticated = !!getCookie('accessToken');

  const [isFulfilled, setIsFulfilled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [renderSnackbar] = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      renderSnackbar(MESSAGE.ALREADY_LOGINED, SNACKBAR.FAILED);
      navigate(PATHNAME.TO_HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (email.length >= 3 && password.length >= 10) {
      setIsFulfilled(true);
      return;
    }
    setIsFulfilled(false);
  }, [email, password]);

  const login = async () => {
    if (!isFulfilled) return;

    try {
      const { accessToken, nickname } = await loginAPI(email, password);

      setCookie('accessToken', accessToken);
      dispatch(doLogin({ nickname }));
      renderSnackbar(`${nickname}님, 안녕하세요 🙇🏻‍♀️`, SNACKBAR.SUCCESS);
      navigate(PATHNAME.TO_HOME);
    } catch (error) {}
  };

  return (
    <Styled.Container>
      <Container width="505px" height="440px">
        <div>
          <Title mainTitle="로그인" subTitle="환영합니다 👋" />
          <Input
            type="email"
            icon={<EmailIcon />}
            label="Email Address"
            inputValue={email}
            setInputValue={setEmail}
          />
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="Password"
            inputValue={password}
            setInputValue={setPassword}
          />
          <AuthButton actionType="Login" action={login} isDisabled={!isFulfilled} />
          <GuideText
            guide="Don’t have an account?"
            destination="Sign up"
            path={PATHNAME.TO_SIGNUP}
          />
        </div>
      </Container>
    </Styled.Container>
  );
};

export default LoginPage;
