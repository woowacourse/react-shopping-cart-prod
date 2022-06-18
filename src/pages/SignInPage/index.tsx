import { Link } from 'react-router-dom';
import SignInput from 'components/@common/SignInput';
import { Styled } from './styles';
import { useSignIn } from 'hooks/useSignIn';

const SignInPage = () => {
  const { handleSubmit, handleEmailInput, currentPasswordRef } = useSignIn();

  return (
    <Styled.SignInPage>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>로그인</Styled.Title>
        <SignInput type={'email'} onChange={handleEmailInput}>
          이메일
        </SignInput>
        <SignInput type={'password'} onChange={handleEmailInput} ref={currentPasswordRef}>
          비밀번호
        </SignInput>

        <Styled.SignInButton>로그인</Styled.SignInButton>

        <Styled.Footer>
          <Link to='/signUp'>회원가입</Link>
        </Styled.Footer>
      </Styled.Form>
    </Styled.SignInPage>
  );
};

export default SignInPage;
