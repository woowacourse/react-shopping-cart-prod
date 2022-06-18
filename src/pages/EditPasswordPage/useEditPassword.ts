import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { editPassword } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import { PATH } from 'Router';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { MESSAGE } from 'constant/message';

export const useEditPassword = () => {
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

  return {
    data,
    passwordValid,
    prevPasswordRef,
    currentPasswordRef,
    handleSubmit,
    handlePrevPasswordInput,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
  };
};
