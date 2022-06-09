import useSnackbar from 'hooks/useSnackbar';
import { MESSAGE } from 'utils/constants';
import apiClient from 'apis/apiClient';

const usePasswordEditAPI = (handleModal, currentPassword, newPassword, isCorrectPassword) => {
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
      renderSnackbar(MESSAGE.UPDATE_PASSWORD_FAILURE, 'FAILED');
    }
  };

  return { editPassword };
};

export default usePasswordEditAPI;
