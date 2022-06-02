import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import useSignInput from 'hooks/useSignInput';
import useUpdateEffect from 'hooks/useUpdateEffect';
import SignInput from 'components/common/SignInput';
import { PATH } from 'Router';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);

  const { currentPasswordRef, passwordValid, handleCurrentPasswordInput } = usePasswordInput();

  const { inputState, validState, handleEmailInput } = useSignInput();

  useUpdateEffect(() => {
    if (!error) {
      navigate(PATH.default);
    }
  }, [data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      password: currentPasswordRef.current.value,
    };

    if (validState.email && passwordValid) {
      dispatch(signIn(inputInfo));
    }
  };

  return (
    <StyledRoot>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>로그인</StyledTitle>
        <SignInput type={'email'} onChange={handleEmailInput}>
          이메일
        </SignInput>
        <SignInput type={'password'} onChange={handleCurrentPasswordInput} ref={currentPasswordRef}>
          비밀번호
        </SignInput>

        <StyledSigninButton>로그인</StyledSigninButton>

        <StyledFooter>
          <Link to='/signUp'>회원가입</Link>
        </StyledFooter>
      </StyledForm>
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  ${flexCenter}
  height: 100rem;
`;

const StyledForm = styled.form`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 60rem;
  gap: 5rem;
  height: 70rem;
  border: 1px solid ${theme.colors.black};
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 3.4rem;
  line-height: 3.6rem;

  text-align: center;
`;

const StyledSigninButton = styled.button`
  width: 80%;
  height: 6.5rem;
  background-color: ${theme.colors.primary};
  font-size: 2.3rem;
  font-weight: bold;
  color: ${theme.colors.white};
  border-radius: 6px;
`;

const StyledFooter = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.4rem;
  letter-spacing: 0.5px;
`;

export default SignInPage;
