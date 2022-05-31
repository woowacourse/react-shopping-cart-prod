import Styled from './index.style';
import Input from 'components/Input';
import { ReactComponent as EmailIcon } from 'assets/email_icon.svg';
import { ReactComponent as PasswordIcon } from 'assets/pw_icon.svg';
import Title from 'components/Title';
import GuideText from 'components/GuideText';
import AuthButton from 'components/AuthButton';
import { useState, useEffect } from 'react';
import Container from 'components/@shared/Container';

const LoginPage = () => {
  const [isFullFilled, setIsFullFilled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (email.length >= 3 && password.length >= 10) {
      setIsFullFilled(true);
      return;
    }
    setIsFullFilled(false);
  }, [email, password]);

  return (
    <Styled.Container>
      <Container width="505px" height="507px">
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
          <AuthButton actionType="Login" action={() => {}} isDisabled={!isFullFilled} />
          <GuideText guide="Don’t have an account?" destination="Sign up" path="/signup" />
        </div>
      </Container>
    </Styled.Container>
  );
};

export default LoginPage;
