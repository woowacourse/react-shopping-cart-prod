import SignInput from 'components/@common/SignInput';
import { Styled } from './styles';
import { useEditPassword } from './useEditPassword';

const EditPasswordPage = () => {
  const {
    data,
    passwordValid,
    prevPasswordRef,
    currentPasswordRef,
    handleSubmit,
    handlePrevPasswordInput,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
  } = useEditPassword();

  return (
    <Styled.EditPasswordPage>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>비밀번호 수정</Styled.Title>

        <SignInput placeholder={data.email} type={'email'} disable={true}>
          이메일
        </SignInput>
        <SignInput placeholder={data.username} type={'text'} disable={true}>
          이름
        </SignInput>
        <SignInput
          type={'password'}
          onChange={handlePrevPasswordInput}
          ref={prevPasswordRef}
          isValid={passwordValid.prev}
        >
          이전 비밀번호
        </SignInput>
        <SignInput
          type={'password'}
          onChange={handleCurrentPasswordInput}
          ref={currentPasswordRef}
          isValid={passwordValid.current}
        >
          새 비밀번호
        </SignInput>
        <SignInput
          type={'password'}
          onChange={handleCurrentPasswordConfirmInput}
          isValid={passwordValid.confirm}
        >
          새 비밀번호 확인
        </SignInput>

        <Styled.SignUpButton>확인</Styled.SignUpButton>
      </Styled.Form>
    </Styled.EditPasswordPage>
  );
};

export default EditPasswordPage;
