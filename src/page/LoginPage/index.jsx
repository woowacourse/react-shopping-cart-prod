// @ts-nocheck
import { Container, Input, Title, GuideText, AuthButton, Logo } from 'components';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import Styled from './index.style';

import useCheckAuth from 'hooks/useCheckAuth';
import useLoginAPI from 'hooks/apis/useLoginAPI';

const LoginPage = () => {
  const { email, setEmail, password, setPassword, login, isFulfilled } = useLoginAPI();
  useCheckAuth(isFulfilled);

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
