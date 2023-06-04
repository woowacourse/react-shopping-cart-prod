import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ORDERS_BASE_URL } from '../constants/api';
import { fetchOrders, postOrder } from '../remotes/order';
import { serverOriginState } from '../recoil/atoms/common';
import { ordersState } from '../recoil/atoms/orders';
import type { OrderPayload } from '../types/order';

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
      const response = await postOrder(
        `${serverOrigin}${ORDERS_BASE_URL}`,
        orderPayload,
      );
      const orderId = getOrderIdFromHeaders(Array.from(response.headers));

      updateOrders();
      navigate(`${ORDERS_BASE_URL}/complete/${orderId}`);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    }
  };

  const getOrderIdFromHeaders = (headers: Array<[string, string]>) => {
    const locationHeader = headers.find(([name]) => name === 'location');

    if (locationHeader === undefined) return;

    const [, orderUrl] = locationHeader;
    const orderId = orderUrl.replace(`${ORDERS_BASE_URL}/`, '');

    return orderId;
  };

  return { orders, updateOrders, sendOrder };
};

export default useOrder;
