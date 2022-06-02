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
import axios from 'axios';
import { setCookie, getCookie } from 'utils/cookie';

import { useNavigate } from 'react-router-dom';
import store from 'store/store';
import { doLogin } from 'actions/actionCreator';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';

const LoginPage = () => {
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

      setCookie('accessToken', response.data.accessToken);
      store.dispatch(doLogin({ nickname: response.data.nickname }));
      renderSnackbar(`${response.data.nickname}님 환영합니다 👋`, 'SUCCESS');
      navigate('/');
    } catch (error) {
      renderSnackbar(`아이디와 비밀번호를 다시 확인해주세요.`, 'FAILED');
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
