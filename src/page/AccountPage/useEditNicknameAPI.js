import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginComplete } from 'reducers/authReducer';

const useEditNicknameAPI = (isNicknameCorrect, nickname) => {
  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const editNickname = async () => {
    try {
      if (!isNicknameCorrect) return;

      const response = await apiClient.patch('/customers/profile', {
        nickname,
      });
      dispatch(loginComplete({ nickname: response.data.nickname }));
      renderSnackbar(MESSAGE.UPDATE_NICKNAME_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
      setError(customError || error);
    } finally {
      setIsLoading(false);
    }
  };

  return { editNickname, isLoading, error };
};

export default useEditNicknameAPI;
