import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import styled from 'styled-components';
import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useSignInput from 'hooks/useSignInput';
import usePasswordInput from 'hooks/usePasswordInput';
import useUpdateEffect from 'hooks/useUpdateEffect';
import SignInput from 'components/common/SignInput';
import { PATH } from 'Router';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const { inputState, validState, handleEmailInput, handleNameInput } = useSignInput();
  const {
    currentPasswordRef,
    passwordValid,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
  } = usePasswordInput();

  useUpdateEffect(() => {
    if (!error) {
      navigate(PATH.signIn);
    }
  }, [loading, error]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      username: inputState.name,
      password: currentPasswordRef.current.value,
    };

    if (
      Object.values(validState).every(valid => valid) &&
      [passwordValid.current, passwordValid.confirm].every(valid => valid)
    ) {
      dispatch(signUp(inputInfo));
    }
  };

  return (
    <StyledRoot>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>회원가입</StyledTitle>

        <SignInput type={'email'} onChange={handleEmailInput} isValid={validState.email}>
          이메일
        </SignInput>
        <SignInput type={'text'} onChange={handleNameInput} isValid={validState.name}>
          이름
        </SignInput>
        <SignInput
          type={'password'}
          onChange={handleCurrentPasswordInput}
          ref={currentPasswordRef}
          isValid={passwordValid.current}
        >
          비밀번호
        </SignInput>
        <SignInput
          type={'password'}
          onChange={handleCurrentPasswordConfirmInput}
          isValid={passwordValid.confirm}
        >
          비밀번호 확인
        </SignInput>

        <StyledSignUpButton>확인</StyledSignUpButton>
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
  height: 90rem;
  border: 1px solid ${theme.colors.black};
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
  color: ${theme.colors.white};
  border-radius: 6px;
`;

export default SignUpPage;
