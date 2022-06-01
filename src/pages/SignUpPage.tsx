import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useSignInput from 'hooks/useSignInput';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);

  const {
    inputState,
    validState,
    handleEmailInput,
    handleNameInput,
    handlePasswordInput,
    handlePasswordConfirmInput,
  } = useSignInput();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      name: inputState.name,
      password: inputState.password,
    };

    if (Object.values(validState).every(valid => valid)) {
      await dispatch(signUp(inputInfo));

      if (!error) {
        navigate('/signIn');
      }
    }
  };

  return (
    <StyledRoot onSubmit={handleSubmit}>
      <StyledTitle>회원가입</StyledTitle>

      <SignInput type={'email'} onChange={handleEmailInput}>
        이메일
      </SignInput>
      <SignInput type={'text'} onChange={handleNameInput}>
        이름
      </SignInput>
      <SignInput type={'password'} onChange={handlePasswordInput}>
        비밀번호
      </SignInput>
      <SignInput type={'password'} onChange={handlePasswordConfirmInput}>
        비밀번호 확인
      </SignInput>

      <StyledSignUpButton>확인</StyledSignUpButton>
    </StyledRoot>
  );
};

const StyledRoot = styled.form`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 50px;
  height: 900px;
  border: 1px solid black;
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 34px;
  line-height: 36px;

  text-align: center;
`;

const StyledSignUpButton = styled.button`
  width: 80%;
  height: 65px;
  background-color: ${theme.colors.primary};
  font-size: 23px;
  font-weight: bold;
  color: white;
  border-radius: 6px;
`;

export default SignUpPage;
