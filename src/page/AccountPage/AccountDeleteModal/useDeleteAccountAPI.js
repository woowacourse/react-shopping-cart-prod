// @ts-nocheck
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSnackbar from '../../../hooks/useSnackbar';

import apiClient from 'apis/apiClient';
import { logoutComplete } from 'reducers/authReducer';
import { initializeCartList } from 'reducers/cartReducer';

import { MESSAGE, ROUTES } from 'utils/constants';
import { deleteCookie } from 'utils/cookie';

// 회원탈퇴
const useDeleteAccountAPI = (handleModal, password, isCorrectPassword) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const navigate = useNavigate();

  const deleteAccount = useCallback(async () => {
    try {
      if (!isCorrectPassword) return;

      await apiClient.axios.delete('/customers', {
        data: {
          password,
        },
      });

      deleteCookie('accessToken');
      dispatch(logoutComplete());
      dispatch(initializeCartList({ shoppingCart: [] }));
      handleModal();
      renderSnackbar(MESSAGE.DELETE_ACCOUNT_SUCCESS, 'SUCCESS');
      navigate(ROUTES.HOME);
    } catch (error) {
      const customError = error.response.data;
      navigate(ROUTES.LOGIN);
      renderSnackbar(customError.message || error.message, 'FAILED');
      setError(customError || error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, handleModal, isCorrectPassword, navigate, password, renderSnackbar]);

  return { deleteAccount, isLoading, error };
};

export default useDeleteAccountAPI;
