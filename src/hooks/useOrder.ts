import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ORDERS_BASE_URL } from '../constants/api';
import { fetchOrders, postOrder } from '../remotes/order';
import { serverOriginState } from '../recoil/atoms/common';
import { getBase64 } from '../constants/auth';
import { userState } from '../recoil/atoms/auth';
import { useEffect, useState } from 'react';
import useToast from '../components/common/Toast/useToast';
import type { Order, OrderPayload } from '../types/order';

const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const serverOrigin = useRecoilValue(serverOriginState);
  const user = useRecoilValue(userState);
  const { showToast } = useToast();

  const updateOrders = async () => {
    try {
      const orders = await fetchOrders(
        `${serverOrigin}${ORDERS_BASE_URL}`,
        getBase64(user),
      );
      setOrders(orders);
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
      }
    }
  };

  const sendOrder = async (orderPayload: OrderPayload) => {
    try {
      const response = await postOrder(
        `${serverOrigin}${ORDERS_BASE_URL}`,
        orderPayload,
        getBase64(user),
      );
      const orderId = getOrderIdFromHeaders(Array.from(response.headers));

      navigate(`${ORDERS_BASE_URL}/complete/${orderId}`);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    }

    updateOrders();
  };

  const getOrderIdFromHeaders = (headers: Array<[string, string]>) => {
    const locationHeader = headers.find(([name]) => name === 'location');

    if (locationHeader === undefined) return;

    const [, orderUrl] = locationHeader;
    const orderId = orderUrl.replace(`${ORDERS_BASE_URL}/`, '');

    return orderId;
  };

  useEffect(() => {
    updateOrders();
  }, [serverOrigin, user]);

  return { orders, sendOrder };
};

export default useOrder;
