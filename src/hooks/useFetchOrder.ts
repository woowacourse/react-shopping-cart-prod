import { OrderItem } from '../types/request';
import { END_POINTS } from '../constants/endPoints';
import useFetch from './useFetch';

const useFetchOrder = () => {
  const { handleFetch } = useFetch(END_POINTS.ORDERS);

  const postOrders = async (orderItems: OrderItem[]) => {
    try {
      await handleFetch('POST', {
        orderItems,
        orderTime: new Date().toISOString(),
      });
    } catch (error) {
      alert('주문 요청이 실패했습니다.');
    }
  };

  return { postOrders };
};

export default useFetchOrder;
