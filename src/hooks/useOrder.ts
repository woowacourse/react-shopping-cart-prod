import { useNavigate } from 'react-router-dom';
import { ORDERS_BASE_URL } from '../constants/api';
import { postOrder } from '../remotes/order';
import type { OrderPayload } from '../types/order';

const useOrder = () => {
  const navigate = useNavigate();

  const sendOrder = async (orderPayload: OrderPayload) => {
    try {
      const response = await postOrder(ORDERS_BASE_URL, orderPayload);
      const headers = Array.from(response.headers);
      const locationHeader = headers.find(([name]) => name === 'location');

      if (locationHeader === undefined) return;

      const [, orderUrl] = locationHeader;
      const orderId = orderUrl.replace(`${ORDERS_BASE_URL}/`, '');

      navigate(`${ORDERS_BASE_URL}/complete/${orderId}`);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
    }
  };

  return { sendOrder };
};
export default useOrder;
