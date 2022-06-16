// @ts-nocheck
import apiClient from 'apis/apiClient';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { putProductToCart } from 'reducers/cartReducer';

import useLogout from './useLogout';
import useSnackbar from './useSnackbar';

// DONE 4. put 장바구니 내 상품 수량 수정
const usePutCartAPI = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const { logoutByError } = useLogout();

  const [renderSnackbar] = useSnackbar();
  const dispatch = useDispatch();

  const putCart = useCallback(
    async (productId, updatedQuantity) => {
      try {
        const response = await apiClient.axios.put(`/cart/products/${productId}`, {
          quantity: updatedQuantity,
        });
        dispatch(
          putProductToCart({
            productId: response.data.productId,
            name: response.data.name,
            image: response.data.image,
            price: response.data.price,
            quantity: response.data.quantity,
          }),
        );
      } catch (error) {
        const customError = error.response.data;
        setError(customError || error);
        logoutByError(customError);
        renderSnackbar(customError.message || error.message, 'FAILED');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, logoutByError, renderSnackbar],
  );

  const increaseQuantity = (productId, quantity) => {
    putCart(productId, quantity + 1);
  };

  const decreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      putCart(productId, quantity - 1);
    }
  };

  return { increaseQuantity, decreaseQuantity, putCart, isLoading, error };
};

export default usePutCartAPI;
