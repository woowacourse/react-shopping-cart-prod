// @ts-nocheck
import useSnackbar from 'hooks/useSnackbar';
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { getCookie } from 'utils/cookie';

const useGetProfileAPI = (setEmail, setNickname) => {
  const [renderSnackbar] = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = useCallback(async () => {
    try {
      apiClient.defaults.headers = {
        Authorization: `Bearer ${getCookie('accessToken')}`,
        withCredentials: true,
      };
      const response = await apiClient.get('/customers');
      setEmail(response.data.email);
      setNickname(response.data.nickname);
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message, 'FAILED');
      setError(customError || error);
    } finally {
      setIsLoading(false);
    }
  }, [renderSnackbar, setEmail, setNickname]);

  return { getProfile, isLoading, error };
};

export default useGetProfileAPI;
