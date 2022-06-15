// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectiveDeleteFromCart } from 'reducers/cartReducer';
import { MESSAGE } from 'utils/constants';
import useSnackbar from '../../hooks/useSnackbar';

// DONE 5-2. delete 장바구니 내 선택된 상품들 삭제
const useDeleteCheckedProductsAPI = productIds => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const deleteCheckedProducts = useCallback(async () => {
    try {
      await apiClient.delete('/cart', { data: { productIds } });
      dispatch(selectiveDeleteFromCart());
      renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message || error.message, 'FAILED');
      setError(customError || error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, productIds, renderSnackbar]);

  return { deleteCheckedProducts, isLoading, error };
};

export default useDeleteCheckedProductsAPI;
