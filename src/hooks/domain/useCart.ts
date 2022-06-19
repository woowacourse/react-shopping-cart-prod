// @ts-nocheck
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  doDeleteProductFromCart,
  doPutProductToCart,
  doSelectiveDeleteFromCart,
} from 'modules/cart';
import { getCookie } from 'utils/cookie';

const useCart = () => {
  const dispatch = useDispatch();
  const { shoppingCart, order } = useSelector(state => state.cartReducer);

  const getCartAPI = async () => {
    const accessToken = getCookie('accessToken');

    const response = await axios.get('/cart', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const putCartAPI = async (id, quantity) => {
    const accessToken = getCookie('accessToken');

    const response = await axios.put(
      `/cart/products/${id}`,
      {
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  };

  const deleteCartAPI = async productIds => {
    const accessToken = getCookie('accessToken');

    const response = await axios.delete('/cart', {
      data: {
        productIds,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const isInCart = id => shoppingCart.some(product => product.productId === id);

  const getProductQuantity = id => {
    const { quantity } = shoppingCart.find(product => product.productId === id);

    return quantity;
  };

  const deleteProductInCart = async (id: number, alertSuccess?: Function) => {
    try {
      await deleteCartAPI([id]);
      dispatch(doDeleteProductFromCart({ id }));
      alertSuccess?.();
    } catch (error) {}
  };

  const putProductInCart = async (
    // TODO: 네이밍 수정
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number,
    handleSuccess?: Function,
    handleError?: Function,
  ) => {
    try {
      await putCartAPI(id, quantity);
      dispatch(doPutProductToCart({ productId: id, name, price, image, quantity }));
      handleSuccess?.();
    } catch (error) {
      handleError?.(error);
    }
  };

  const deleteProductsInOrder = async (handleSuccess?: Function) => {
    try {
      await deleteCartAPI(order);
      dispatch(doSelectiveDeleteFromCart());
      handleSuccess?.();
    } catch (error) {}
  };

  return {
    shoppingCart,
    isInCart,
    getProductQuantity,
    deleteProductInCart,
    putProductInCart,
    deleteProductsInOrder,
    getCartAPI,
    putCartAPI,
    deleteCartAPI,
  };
};

export default useCart;
