import * as Styled from './LoginPage.styles.tsx';
import diamondMan from '../../assets/diamond-man.png';
import { FormEvent } from 'react';

const LoginPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const data = new FormData(target);

    const values = {
      email: data.get('email'),
      password: data.get('password'),
    };

    // todo: JWT 도입 예정
    alert('JWT 도입 예정입니다. 🔑 \n' + JSON.stringify(values));
  };

  return (
    <Styled.LoginPageWrapper>
      <Styled.LoginPageContent>
        <Styled.Image src={diamondMan} alt='login page image' aria-label='a guy with diamond' />
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Label htmlFor='email'>이메일</Styled.Label>
          <Styled.Input type='email' name='email' />
          <Styled.Label htmlFor='password'>비밀번호</Styled.Label>
          <Styled.Input type='password' name='password' />

          <Styled.Button type='submit'>로그인</Styled.Button>
        </Styled.Form>
      </Styled.LoginPageContent>
    </Styled.LoginPageWrapper>
  );
};

export default LoginPage;
