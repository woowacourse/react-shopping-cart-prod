import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import useMutation from './useMutation';
import { orderState } from '../store/OrderState';
import { serverState } from '../store/ServerState';
import { CART_BASE_URL, ORDER_BASE_URL } from '../constants/url';
import { base64 } from '../constants';
import useGet from './useGet';
import { CartItem, OrderItem } from '../types';
import { cartState, checkedItemsState } from '../store/CartState';
import { removeProductItemFromCartSelector } from '../store/CartSelector';

const useOrder = () => {
  const setCart = useSetRecoilState(cartState);
  const setOrder = useSetRecoilState(orderState);
  const setCheckedItems = useSetRecoilState(checkedItemsState);
  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const { mutate: mutateOrder } = useMutation<OrderItem[]>(setOrder);
  const { mutate: mutateCart, error: cartError } = useMutation<CartItem[]>(setCart);
  const serverUrl = useRecoilValue(serverState);
  const { data: orderData } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);

  const handleRemoveCheckedItem = (cartIds: number[]) => {
    cartIds.forEach((id) => {
      mutateCart(
        {
          url: `${serverUrl}${CART_BASE_URL}/${id}`,
          method: 'DELETE',
          bodyData: { id },
          headers: {
            Authorization: `basic ${base64}`,
            'Content-Type': 'application/json',
          },
        },
        CART_BASE_URL,
      );
      if (cartError) return;

      // TODO: 옮기기

      removeProductItemFromCart(id);
    });
    setCheckedItems([]);
  };

  const handleOrderItems = (cartIds: number[], point: number) => {
    mutateOrder(
      {
        url: `${serverUrl}${ORDER_BASE_URL}`,
        method: 'POST',
        bodyData: { cartIds, point },
        headers: {
          Authorization: `basic ${base64}`,
          'content-type': 'application/json',
        },
      },
      ORDER_BASE_URL,
    );

    if (orderData) setOrder(orderData);
    // handleRemoveCheckedItem(cartIds);
  };

  return { handleOrderItems };
};

export default useOrder;
