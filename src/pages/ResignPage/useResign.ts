import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import usePasswordInput from 'hooks/usePasswordInput';
import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { resign } from 'redux/action-creators/userThunk';
import { UserAction } from 'redux/actions/user';
import { PATH } from 'Router';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { MESSAGE } from 'constant/message';

export const useResign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch<UserAction>();
  const { data: userData } = useAppSelector(state => state.userReducer);
  const [confirmMessageValid, setConfirmMessageValid] = useState(false);
  const confirmMessageRef = useRef<HTMLInputElement | null>(null);
  const { currentPasswordRef, passwordValid, handleCurrentPasswordInput } = usePasswordInput();

  const handleMessageInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setConfirmMessageValid(value === '응');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputInfo = currentPasswordRef.current.value;

    if (passwordValid.current && confirmMessageValid) {
      try {
        await thunkDispatch(resign(inputInfo));
        navigate(PATH.default);
      } catch (error) {
        dispatch(updateSnackBar(MESSAGE.FAILED_RESIGN));
      }
    }
  };

  return {
    userData,
    confirmMessageValid,
    currentPasswordRef,
    confirmMessageRef,
    handleSubmit,
    handleMessageInput,
    handleCurrentPasswordInput,
  };
};
