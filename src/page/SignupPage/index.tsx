// @ts-nocheck
import { Input, Title, GuideText, AuthButton, Container, Logo } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import { ReactComponent as NicknameIcon } from 'assets/nickname_icon.svg';
import Styled from './index.style';

import { validateEmail, validateNickname, validatePassword } from 'utils/validator';
import useCheckAuth from 'hooks/useCheckAuth';
import useSignupAPI from 'page/SignupPage/useSignupAPI';

const SignupPage = () => {
  useCheckAuth();

  const {
    signup,
    email,
    setEmail,
    nickname,
    setNickname,
    password,
    setPassword,
    isEmailCorrect,
    setIsEmailCorrect,
    isNicknameCorrect,
    setIsNicknameCorrect,
    isPasswordCorrect,
    setIsPasswordCorrect,
    isFulfilled,
  } = useSignupAPI();

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
            autoFocus={true}
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
