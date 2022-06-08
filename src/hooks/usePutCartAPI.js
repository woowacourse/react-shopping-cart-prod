// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doPutProductToCart } from 'reducers/cart.reducer';
import useLogout from './useLogout';
import useSnackbar from './useSnackbar';

// DONE 4. put 장바구니 내 상품 수량 수정
const usePutCartAPI = () => {
  const [isPutCartLoading, setIsPutCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logoutByError } = useLogout();

  const [renderSnackbar] = useSnackbar();
  const dispatch = useDispatch();

  const putCart = useCallback(
    async (productId, updatedQuantity) => {
      setIsPutCartLoading(true);

      try {
        const response = await apiClient.put(`/cart/products/${productId}`, {
          quantity: updatedQuantity,
        });
        dispatch(
          doPutProductToCart({
            productId: response.data.productId,
            name: response.data.name,
            image: response.data.image,
            price: response.data.price,
            quantity: response.data.quantity,
          }),
        );
        setIsPutCartLoading(true);
      } catch (error) {
        const customError = error.response.data;
        setError(customError || error);
        logoutByError(customError);
        renderSnackbar(customError.message || error.message, 'FAILED');
        setIsPutCartLoading(true);
      }
    },
    [dispatch, logoutByError, renderSnackbar],
  );

  return { putCart, isPutCartLoading, error };
};

export default usePutCartAPI;
