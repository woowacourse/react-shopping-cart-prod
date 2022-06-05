// @ts-nocheck
import Styled from './index.style';
import Input from 'components/Input';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import Title from 'components/Title';
import GuideText from 'components/GuideText';
import AuthButton from 'components/AuthButton';
import { useState, useEffect } from 'react';
import Container from 'components/@shared/Container';
import { setCookie } from 'utils/cookie';

import { useNavigate } from 'react-router-dom';
import store from 'store/store';
import { doLogin } from 'actions/actionCreator';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import Logo from 'components/Logo';
import { useSelector } from 'react-redux';
import { authApiClient } from 'utils/apiClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

  const [isFulfilled, setIsFulfilled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [renderSnackbar] = useSnackbar();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/');
    }
  }, [isLoading]);

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
      const response = await authApiClient.post('/auth/login', {
        email,
        password,
      });

      setCookie('accessToken', response.data.accessToken);
      store.dispatch(doLogin({ nickname: response.data.nickname }));
      renderSnackbar(`${response.data.nickname}${MESSAGE.LOGIN_SUCCESS}`, 'SUCCESS');
      navigate('/');
    } catch (error) {
      renderSnackbar(MESSAGE.LOGIN_FAILURE, 'FAILED');
    }
  };

  return (
    <Styled.Container>
      <Logo />
      <br />
      <Container width="505px" height="440px">
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
        <GuideText guide="Don’t have an account?" destination="Sign up" path="/signup" />
      </Container>
    </Styled.Container>
  );
};

export default LoginPage;
