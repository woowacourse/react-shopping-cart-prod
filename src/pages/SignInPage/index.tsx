import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { useAppDispatch } from 'hooks/useAppDispatch';
import usePasswordInput from 'hooks/usePasswordInput';
import useSignInput from 'hooks/useSignInput';
import SignInput from 'components/@common/SignInput';
import { PATH } from 'Router';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { MESSAGE } from 'constant/message';
import { Styled } from './styles';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();
  const { currentPasswordRef, passwordValid, handleCurrentPasswordInput } = usePasswordInput();
  const { inputState, validState, handleEmailInput } = useSignInput();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      password: currentPasswordRef.current.value,
    };

    if (validState.email && passwordValid) {
      try {
        await thunkDispatch(signIn(inputInfo));
        navigate(PATH.default);
      } catch (error) {
        dispatch(updateSnackBar(MESSAGE.FAILED_SIGN_IN));
      }
    }
  };

  return (
    <Styled.SignInPage>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>로그인</Styled.Title>
        <SignInput type={'email'} onChange={handleEmailInput}>
          이메일
        </SignInput>
        <SignInput type={'password'} onChange={handleCurrentPasswordInput} ref={currentPasswordRef}>
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
