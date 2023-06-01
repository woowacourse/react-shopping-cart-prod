import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ORDERS_BASE_URL } from '../constants/api';
import { fetchOrders, postOrder } from '../remotes/order';
import { serverOriginState } from '../recoil/atoms/common';
import type { OrderPayload } from '../types/order';
import { ordersState } from '../recoil/atoms/orders';

const useOrder = () => {
  const orders = useRecoilValue(ordersState);
  const navigate = useNavigate();
  const serverOrigin = useRecoilValue(serverOriginState);

  const updateOrders = useRecoilCallback(
    ({ set }) =>
      async () => {
        const newOrders = await fetchOrders(
          `${serverOrigin}${ORDERS_BASE_URL}`,
        );

        set(ordersState, newOrders);
      },
    [serverOrigin],
  );

  const sendOrder = async (orderPayload: OrderPayload) => {
    try {
      const response = await postOrder(ORDERS_BASE_URL, orderPayload);
      const headers = Array.from(response.headers);
      const locationHeader = headers.find(([name]) => name === 'location');

      if (locationHeader === undefined) return;

      const [, orderUrl] = locationHeader;
      const orderId = orderUrl.replace(`${ORDERS_BASE_URL}/`, '');

      updateOrders();
      navigate(`${ORDERS_BASE_URL}/complete/${orderId}`);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    }
  };

  return { orders, updateOrders, sendOrder };
};

export default useOrder;
