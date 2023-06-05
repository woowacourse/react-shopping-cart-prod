import type { ScheduledOrderType } from '../types/product';
import { useRecoilState, useRecoilValue } from 'recoil';

import { api } from '../apis/order';
import { hostNameAtom } from '../recoil/hostData';
import { orderAtom } from '../recoil/orderData';
import { checkedCartItemIdsAtom } from '../recoil/checkedCartItemData';
import { cartAtom } from '../recoil/cartItemData';
import { userPointAtom } from '../recoil/pointData';

const useOrder = () => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [checkedCartItemIds, setCheckedCartItemIds] = useRecoilState(
    checkedCartItemIdsAtom
  );
  const [order, setOrder] = useRecoilState(orderAtom);
  const [point, setPoint] = useRecoilState(userPointAtom);

  const hostName = useRecoilValue(hostNameAtom);

  const addOrder = async (newOrder: ScheduledOrderType) => {
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
      setCart([...updatedCartProducts]);

      const updatedPoints = await api(hostName).then((apiInstance) => {
        return apiInstance.getPoints();
      });
      setPoint({ ...updatedPoints });

      setCheckedCartItemIds([]);
    }
  };

  return { addOrder };
};

export default useOrder;
