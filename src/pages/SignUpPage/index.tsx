import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { updateSnackBar } from 'redux/actions/snackBar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useSignInput from 'hooks/useSignInput';
import usePasswordInput from 'hooks/usePasswordInput';
import SignInput from 'components/@common/SignInput';
import { PATH } from 'Router';
import { useDispatch } from 'react-redux';
import { MESSAGE } from 'constant/message';
import { Styled } from './styles';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();
  const { inputState, validState, handleEmailInput, handleNameInput } = useSignInput();
  const {
    currentPasswordRef,
    passwordValid,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
  } = usePasswordInput();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      name: inputState.name,
      password: currentPasswordRef.current.value,
    };

    if (
      Object.values(validState).every(valid => valid) &&
      [passwordValid.current, passwordValid.confirm].every(valid => valid)
    ) {
      try {
        await thunkDispatch(signUp(inputInfo));
        navigate(PATH.signIn);
      } catch (error) {
        dispatch(updateSnackBar(MESSAGE.FAILED_SIGN_UP));
      }
    }
  };

  return (
    <Styled.SignUpPage>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>회원가입</Styled.Title>

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

        <Styled.SignUpButton>확인</Styled.SignUpButton>
      </Styled.Form>
    </Styled.SignUpPage>
  );
};

export default SignUpPage;
