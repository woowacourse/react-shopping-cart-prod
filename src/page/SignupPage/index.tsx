// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSnackbar from 'hooks/useSnackbar';

import { Input, Title, GuideText, AuthButton, Container } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';

import { validateEmail, validateNickname, validatePassword } from 'utils/validator';
import { MESSAGE } from 'utils/constants';
import Styled from './index.style';

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
      renderSnackbar(MESSAGE.ALREADY_LOGINED, 'FAILED');
      navigate('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsFulfilled(isEmailCorrect && isNicknameCorrect && isPasswordCorrect);
  }, [email, nickname, password, isEmailCorrect, isNicknameCorrect, isPasswordCorrect]);

  const signup = async () => {
    if (!isFulfilled) return;

    await axios.post('/customers', {
      email,
      nickname,
      password,
    });
  };

  return (
    <Styled.Container>
      <Container width="519px" height="570px">
        <div>
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
        </div>
      </Container>
    </Styled.Container>
  );
};

export default SignupPage;
