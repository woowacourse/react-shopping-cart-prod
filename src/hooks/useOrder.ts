import type { ScheduledOrder } from '../types/product';
import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/order';
import { hostNameAtom } from '../recoil/hostData';
import { orderAtom } from '../recoil/orderProductData';
import { checkedCartItemIdsAtom } from '../recoil/checkedProductData';
import { cartAtom } from '../recoil/cartProductData';
import { updateData } from '../utils/localStorage';
import { userPointAtom } from '../recoil/pointData';

const useOrder = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );
  const [order, setOrder] = useRecoilState(orderAtom);
  const point = useRecoilValue(userPointAtom);

  const hostName = useRecoilValue(hostNameAtom);

  const addOrder = async (newOrder: ScheduledOrder) => {
    const orderId = await api(hostName).then((apiInstance) => {
      return apiInstance.createOrder(newOrder);
    });

    if (orderId) {
      const updatedOrders = await api(hostName).then((apiInstance) => {
        return apiInstance.getOrders();
      });
      setOrder([...updatedOrders]);

      const updatedCartProducts = cart.filter(
        (item) => !checkedCartItemIds.includes(item.cartItemId)
      );

      const updatedPoints = {
        ...point,
        userPoint: point.userPoint - newOrder.usePoint,
      };
      updateData('cart', updatedCartProducts);
      updateData('point', updatedPoints);
      setCart(updatedCartProducts);
      setCheckedCartItemIds([]);
    }
  };

  return { addOrder };
};

export default useOrder;
