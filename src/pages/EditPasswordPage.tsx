import SignInput from 'components/common/SignInput';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { editPassword } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editPasswordInfo = {
      password: prevPasswordRef.current.value,
      newPassword: currentPasswordRef.current.value,
    };

    if (Object.values(passwordValid).every(valid => valid)) {
      await dispatch(editPassword(editPasswordInfo));

      if (!error) {
        navigate('/main/1');
      }
    }
  };

  return (
    <StyledRoot>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>비밀번호 수정</StyledTitle>

        <SignInput placeholder={data.email} type={'email'} disable={true}>
          이메일
        </SignInput>
        <SignInput placeholder={data.name} type={'text'} disable={true}>
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
  height: 1000px;
`;

const StyledForm = styled.form`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 50px;
  height: 1000px;
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

export default EditPasswordPage;
