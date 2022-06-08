// @ts-nocheck
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useSnackbar from 'hooks/useSnackbar';

import { Container, Input, Title, GuideText, AuthButton, Logo } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import Styled from './index.style';

import { setCookie } from 'utils/cookie';
import { doLogin } from 'actions/actionCreator';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';
import useLogout from 'hooks/useLogout';

const LoginPage = () => {
  // const { logoutByError } = useLogout();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: userEmail } = useLocation();
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

  const [isFulfilled, setIsFulfilled] = useState(false);
  const [email, setEmail] = useState(userEmail || '');
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
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      setCookie('accessToken', response.data.accessToken);
      dispatch(doLogin({ nickname: response.data.nickname }));
      renderSnackbar(`${response.data.nickname}${MESSAGE.LOGIN_SUCCESS}`, 'SUCCESS');
      navigate('/');
    } catch (error) {
      const customError = error.response.data;
      // logoutByError(customError);
      navigate('/login');
      renderSnackbar(customError.message, 'FAILED');
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
          autoFocus={true}
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
