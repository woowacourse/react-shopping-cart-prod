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
    const orderId = await (await api(hostName)).createOrder(newOrder);

    if (orderId) {
      const updatedOrders = await (await api(hostName)).getOrders();

      setOrder([...updatedOrders]);

      const updatedCartProducts = cart.filter(
        (item) => !checkedCartItemIds.includes(item.cartItemId)
      );
      setCart([...updatedCartProducts]);

      const updatedPoints = await (await api(hostName)).getPoints();
      setPoint({ ...updatedPoints });

      setCheckedCartItemIds([]);
    }

    return orderId;
  };

  return { addOrder };
};

export default useOrder;
