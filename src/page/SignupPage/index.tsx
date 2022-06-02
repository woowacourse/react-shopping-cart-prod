// @ts-nocheck
import { useState, useEffect } from 'react';
import Styled from './index.style';
import Input from 'components/Input';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';
import Title from 'components/Title';
import GuideText from 'components/GuideText';
import AuthButton from 'components/AuthButton';
import Container from 'components/@shared/Container';
import { validateEmail, validateNickname, validatePassword } from 'utils/validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import Logo from 'components/Logo';
import { getCookie } from 'utils/cookie';

const SignupPage = () => {
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();
  const isAuthenticated = getCookie('accessToken');

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const [isFulfilled, setIsFulfilled] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isNicknameCorrect, setIsNicknameCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      renderSnackbar(MESSAGE.ALREADY_LOGIN, 'FAILED');
      navigate('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFulfilled(isEmailCorrect && isNicknameCorrect && isPasswordCorrect);
  }, [email, nickname, password, isEmailCorrect, isNicknameCorrect, isPasswordCorrect]);

  const signup = async () => {
    if (!isFulfilled) return;

    try {
      const response = await axios.post('/customers', {
        email,
        nickname,
        password,
      });

      renderSnackbar(`${response.data.nickname}${MESSAGE.SIGNUP_SUCCESS}`, 'SUCCESS');
      navigate('/login');
    } catch (error) {
      renderSnackbar(`${email}${MESSAGE.SIGNUP_FAILURE}`, 'FAILED');
    }
  };

  return (
    <Styled.Container>
      <Logo />
      <br />
      <Container width="519px" height="570px">
        <Title mainTitle="회원가입" subTitle="처음 뵙겠습니다 👋" />
        <Styled.InputContainer>
          <Input
            type="email"
            icon={<EmailIcon />}
            label="Email Address"
            inputValue={email}
            setInputValue={setEmail}
            validator={validateEmail}
            isCorrect={isEmailCorrect}
            setIsCorrect={setIsEmailCorrect}
          />
          <Input
            icon={<NicknameIcon />}
            label="Nickname"
            inputValue={nickname}
            setInputValue={setNickname}
            validator={validateNickname}
            isCorrect={isNicknameCorrect}
            setIsCorrect={setIsNicknameCorrect}
          />
          <Input
            type="password"
            icon={<PasswordIcon />}
            label="Password"
            inputValue={password}
            setInputValue={setPassword}
            validator={validatePassword}
            isCorrect={isPasswordCorrect}
            setIsCorrect={setIsPasswordCorrect}
          />
        </Styled.InputContainer>
        <AuthButton actionType="Sign Up" action={signup} isDisabled={!isFulfilled} />
        <GuideText guide="Already have an account?" destination="Login" path="/login" />
      </Container>
    </Styled.Container>
  );
};

export default SignupPage;
