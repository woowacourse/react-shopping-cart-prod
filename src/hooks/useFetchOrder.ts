import { OrderItem } from '../types/requestData';
import { END_POINTS } from '../constants/endPoints';
import useFetch from './useFetch';

const useFetchOrder = () => {
  const { handleFetch } = useFetch(END_POINTS.ORDERS);

  const postOrders = async (orderItems: OrderItem[]) => {
    await handleFetch('POST', {
      orderItems,
      orderTime: new Date().toISOString(),
    });
  };

  const getOrders = async (id: number) => {
    const response = await handleFetch('GET', {}, id);
    return await response.json();
  };

  return { postOrders, getOrders };
};

export default useFetchOrder;
