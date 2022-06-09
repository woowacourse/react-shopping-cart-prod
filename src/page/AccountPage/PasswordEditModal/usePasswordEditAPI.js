import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';
import { useState } from 'react';

const usePasswordEditAPI = (handleModal, currentPassword, newPassword, isCorrectPassword) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [renderSnackbar] = useSnackbar();

  const editPassword = async () => {
    try {
      if (!isCorrectPassword) return;

      await apiClient.patch('/customers/password', {
        password: currentPassword,
        newPassword,
      });

      renderSnackbar(MESSAGE.UPDATE_PASSWORD_SUCCESS, 'SUCCESS');
      handleModal();
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(MESSAGE.UPDATE_PASSWORD_FAILURE, 'FAILED');
      setError(customError || error);
    } finally {
      setIsLoading(false);
    }
  };

  return { editPassword, isLoading, error };
};

export default usePasswordEditAPI;
