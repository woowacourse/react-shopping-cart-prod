import SignInput from 'components/@common/SignInput';

import { Styled } from './styles';
import { useSignUp } from './useSignUp';

const SignUpPage = () => {
  const {
    validState,
    currentPasswordRef,
    passwordValid,
    handleEmailInput,
    handleNameInput,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
    handleSubmit,
  } = useSignUp();

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
