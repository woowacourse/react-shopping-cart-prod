import SignInput from 'components/@common/SignInput';
import { Styled } from './styles';
import { useResign } from './useResign';

const ResignPage = () => {
  const {
    userData,
    confirmMessageValid,
    currentPasswordRef,
    confirmMessageRef,
    handleSubmit,
    handleMessageInput,
    handleCurrentPasswordInput,
  } = useResign();

  return (
    <Styled.ResignPage>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Title>회원 탈퇴</Styled.Title>

        <SignInput placeholder={userData.email} type={'email'} disable={true}>
          이메일
        </SignInput>
        <SignInput type={'password'} onChange={handleCurrentPasswordInput} ref={currentPasswordRef}>
          비밀번호 확인
        </SignInput>
        <SignInput
          type={'text'}
          placeholder='응'
          onChange={handleMessageInput}
          ref={confirmMessageRef}
          isValid={confirmMessageValid}
        >
          {'탈퇴하시려면 "응"을 입력해 주세요'}
        </SignInput>

        <Styled.SignUpButton>확인</Styled.SignUpButton>
      </Styled.Form>
    </Styled.ResignPage>
  );
};

export default ResignPage;
