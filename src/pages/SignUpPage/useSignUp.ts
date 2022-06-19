import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { updateSnackBar } from 'redux/actions/snackBar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useSignInput from 'hooks/useSignInput';
import usePasswordInput from 'hooks/usePasswordInput';
import { PATH } from 'Router';
import { MESSAGE } from 'constant/message';

export const useSignUp = () => {
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

  return {
    validState,
    currentPasswordRef,
    passwordValid,
    handleEmailInput,
    handleNameInput,
    handleCurrentPasswordInput,
    handleCurrentPasswordConfirmInput,
    handleSubmit,
  };
};
