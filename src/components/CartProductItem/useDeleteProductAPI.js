// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductFromCart } from 'reducers/cartReducer';
import { MESSAGE } from 'utils/constants';
import useSnackbar from '../../hooks/useSnackbar';

// DONE 5. delete 장바구니 내 선택된 상품 삭제
const useDeleteProductAPI = productId => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [renderSnackbar] = useSnackbar();

  const deleteProduct = useCallback(async () => {
    try {
      await apiClient.axios.delete('/cart', { data: { productIds: [productId] } });
      dispatch(deleteProductFromCart({ productId: productId }));
      renderSnackbar(MESSAGE.REMOVE_CART_SUCCESS, 'SUCCESS');
    } catch (error) {
      const customError = error.response.data;
      renderSnackbar(customError.message || error.message, 'FAILED');
      setError(customError || error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, productId, renderSnackbar]);

  return { deleteProduct, isLoading, error };
};

export default useDeleteProductAPI;
