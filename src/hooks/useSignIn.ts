import { MESSAGE } from 'constant/message';
import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'redux/action-creators/userThunk';
import { updateSnackBar } from 'redux/actions/snackBar';
import { UserAction } from 'redux/actions/user';
import { PATH } from 'Router';
import { useAppDispatch } from './useAppDispatch';
import usePasswordInput from './usePasswordInput';
import useSignInput from './useSignInput';

export const useSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();
  const { currentPasswordRef, passwordValid } = usePasswordInput();
  const { inputState, validState, handleEmailInput } = useSignInput();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputInfo = {
      email: inputState.email,
      password: currentPasswordRef.current.value,
    };

    if (validState.email && passwordValid) {
      try {
        await thunkDispatch(signIn(inputInfo));
        navigate(PATH.default);
      } catch (error) {
        dispatch(updateSnackBar(MESSAGE.FAILED_SIGN_IN));
      }
    }
  };

  return { handleSubmit, handleEmailInput, currentPasswordRef };
};
