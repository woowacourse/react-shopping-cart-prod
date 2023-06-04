import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import useMutation from './useMutation';
import { orderState } from '../store/OrderState';
import { serverState } from '../store/ServerState';
import { ORDER_BASE_URL } from '../constants/url';
import { base64 } from '../constants';
import useGet from './useGet';
import { OrderItem } from '../types';
import { checkedItemsState } from '../store/CartState';
import { removeProductItemFromCartSelector } from '../store/CartSelector';

const useOrder = () => {
  const setOrder = useSetRecoilState(orderState);
  const setCheckedItems = useSetRecoilState(checkedItemsState);
  const removeProductItemFromCart = useRecoilCallback(({ set }) => (id: number) => {
    set(removeProductItemFromCartSelector(id), []);
  });

  const { mutate: mutateOrder } = useMutation<OrderItem[]>(setOrder);
  const serverUrl = useRecoilValue(serverState);
  const { data: orderData } = useGet<OrderItem[]>(`${serverUrl}${ORDER_BASE_URL}`);

  const handleRemoveCheckedItem = (cartIds: number[]) => {
    cartIds.forEach((id) => {
      removeProductItemFromCart(id);
    });
    setCheckedItems([]);
  };

  const handleOrderItems = (cartIds: number[], point: number, deliveryFee: number) => {
    mutateOrder(
      {
        url: `${serverUrl}${ORDER_BASE_URL}`,
        method: 'POST',
        bodyData: { cartIds, point, deliveryFee },
        headers: {
          Authorization: `basic ${base64}`,
          'content-type': 'application/json',
        },
      },
      ORDER_BASE_URL,
    );

    if (orderData) setOrder(orderData);
    handleRemoveCheckedItem(cartIds);
  };

  return { handleOrderItems };
};

export default useOrder;
