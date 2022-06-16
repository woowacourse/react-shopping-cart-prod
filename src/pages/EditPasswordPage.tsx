import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { editPassword } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import useUpdateEffect from 'hooks/useUpdateEffect';
import SignInput from 'components/@common/SignInput';
import { PATH } from 'Router';

const EditPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch<UserAction>();
  const { loading, error, data } = useAppSelector(state => state.userReducer);
  const {
    prevPasswordRef,
    currentPasswordRef,
    passwordValid,
    handlePrevPasswordInput,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
  } = usePasswordInput();

  useUpdateEffect(() => {
    if (!error && !loading) {
      navigate(PATH.default);
    }
  }, [loading]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editPasswordInfo = {
      password: prevPasswordRef.current.value,
      newPassword: currentPasswordRef.current.value,
    };

    if (Object.values(passwordValid).every(valid => valid)) {
      dispatch(editPassword(editPasswordInfo));
    }
  };

  return (
    <StyledRoot>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>비밀번호 수정</StyledTitle>

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
  height: 100rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 5px;
`;

const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 3.4rem;
  line-height: 3.6rem;

  text-align: center;
`;

const StyledSignUpButton = styled.button`
  width: 80%;
  height: 6.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 2.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
`;

export default EditPasswordPage;
