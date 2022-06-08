// @ts-nocheck
import apiClient from 'apis/apiClient';
import useLogout from 'hooks/useLogout';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLogout } from 'reducers/auth.reducer';
import { doInitializeCartList } from 'reducers/cart.reducer';
import { MESSAGE } from 'utils/constants';
import { deleteCookie } from 'utils/cookie';
import useSnackbar from '../useSnackbar';

// 회원탈퇴
const useDeleteAccountAPI = (handleModal, password, isCorrectPassword) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();
  const { logoutByError } = useLogout();
  const navigate = useNavigate();

  const deleteAccount = useCallback(async () => {
    try {
      if (!isCorrectPassword) return;

      await apiClient.delete('/customers', {
        data: {
          password,
        },
      });

      deleteCookie('accessToken');
      dispatch(doLogout());
      dispatch(doInitializeCartList({ shoppingCart: [] }));
      handleModal();
      renderSnackbar(MESSAGE.DELETE_ACCOUNT_SUCCESS, 'SUCCESS');
      navigate('/');
    } catch (error) {
      const customError = error.response.data;
      navigate('/login');
      renderSnackbar(customError.message || error.message, 'FAILED');
      setError(customError || error);
    } finally {
      setIsDeleteLoading(false);
    }
  }, [dispatch, handleModal, isCorrectPassword, navigate, password, renderSnackbar]);

  return { deleteAccount, isDeleteLoading, error };
};

export default useDeleteAccountAPI;
