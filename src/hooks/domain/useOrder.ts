// @ts-nocheck
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doDeleteProductFromOrder, doAddProdcutToOrder, doOrderFromCart } from 'modules/cart';
import { getCookie } from 'utils/cookie';

const useOrder = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const { shoppingCart, order } = useSelector(state => state.cartReducer);

  const postOrderAPI = async productIds => {
    const accessToken = getCookie('accessToken');

    const response = await axios.post(
      `/orders`,
      {
        productIds,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response;
  };

  const getOrderAPI = async id => {
    const accessToken = getCookie('accessToken');

    const response = await axios.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  const isInOrder = id => order.some(productId => productId === id);

  const updateOrder = id => {
    if (isInOrder(id)) {
      dispatch(doDeleteProductFromOrder({ id }));
    } else {
      dispatch(doAddProdcutToOrder({ id }));
    }
  };

  const postOrder = async (handleSuccess?: Function) => {
    try {
      const response = await postOrderAPI(order);
      const location = response.headers.location.split('/');
      const id = location[location.length - 1];

      dispatch(doOrderFromCart());

      handleSuccess?.(id);
    } catch (error) {}
  };

  useEffect(() => {
    setTotalPrice(
      shoppingCart.reduce((acc, cur) => {
        if (!order.includes(cur.productId)) return acc;

        return acc + cur.price * cur.quantity;
      }, 0),
    );
  }, [order, shoppingCart]);

  return { order, totalPrice, isInOrder, updateOrder, postOrder, postOrderAPI, getOrderAPI };
};

export default useOrder;
