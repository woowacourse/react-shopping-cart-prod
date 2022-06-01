import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useSignInput from 'hooks/useSingInput';
import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);

  const { inputState, validState, handleEmailInput, handlePasswordInput } = useSignInput();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      password: inputState.password,
    };

    if ([validState.email, validState.password].every(valid => valid)) {
      dispatch(signIn(inputInfo));
      navigate('/main/1');
    }
  };

  return (
    <StyledRoot onSubmit={handleSubmit}>
      <StyledTitle>로그인</StyledTitle>
      <SignInput type={'email'} onChange={handleEmailInput}>
        이메일
      </SignInput>
      <SignInput type={'password'} onChange={handlePasswordInput}>
        비밀번호
      </SignInput>

      <StyledSigninButton>로그인</StyledSigninButton>

      <StyledFooter>
        <Link to='/signUp'>회원가입</Link>
      </StyledFooter>
    </StyledRoot>
  );
};

const StyledRoot = styled.form`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 50px;
  height: 700px;
  border: 1px solid black;
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 34px;
  line-height: 36px;

  text-align: center;
`;

const StyledSigninButton = styled.button`
  width: 80%;
  height: 65px;
  background-color: ${theme.colors.primary};
  font-size: 23px;
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

const StyledFooter = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

export default SignInPage;
