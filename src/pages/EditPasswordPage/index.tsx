import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { editPassword } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import SignInput from 'components/@common/SignInput';
import { PATH } from 'Router';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { MESSAGE } from 'constant/message';
import { Styled } from './styles';

const EditPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();
  const { data } = useAppSelector(state => state.userReducer);
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
      try {
        await thunkDispatch(editPassword(editPasswordInfo));
        navigate(PATH.default);
      } catch (error) {
        dispatch(updateSnackBar(MESSAGE.FAILED_EDIT_PASSWORD));
      }
    }
  };

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
