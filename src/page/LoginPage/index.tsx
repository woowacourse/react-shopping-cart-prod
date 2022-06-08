// @ts-nocheck
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSnackbar from 'hooks/useSnackbar';

import { Input, Title, GuideText, AuthButton, Container } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';

import { doLogin } from 'modules/auth';
import { setCookie, getCookie } from 'utils/cookie';
import { MESSAGE, ERROR } from 'utils/constants';
import Styled from './index.style';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!getCookie('accessToken');

  const [isFulfilled, setIsFulfilled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [renderSnackbar] = useSnackbar();

  useEffect(() => {
    if (isAuthenticated) {
      renderSnackbar(MESSAGE.ALREADY_LOGINED, 'FAILED');
      navigate('/');
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
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      const { accessToken, nickname } = response.data;

      setCookie('accessToken', accessToken);
      dispatch(doLogin({ nickname }));

      renderSnackbar(`${nickname}님, 안녕하세요 🙇🏻‍♀️`, 'SUCCESS');
      navigate('/');
    } catch (error) {
      const { code, message } = error.response.data;

      if (code) {
        renderSnackbar(ERROR[code], 'FAILED');
      } else {
        renderSnackbar(message || error.message, 'FAILED');
      }

      /**
       * 2201 : 이메일 혹은 비밀번호가 일치하지 않은 경우
       */
    }
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
          <GuideText guide="Don’t have an account?" destination="Sign up" path="/signup" />
        </div>
      </Container>
    </Styled.Container>
  );
};

export default LoginPage;
