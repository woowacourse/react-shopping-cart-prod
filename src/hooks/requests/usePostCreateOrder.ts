import { END_POINTS } from '../../constants/END_POINTS.ts';
import useFetch from '../useFetch.ts';
import { OrderResponse } from '../../types/responses/OrderResponse.ts';

const usePostCreateOrder = () => {
  const [createOrderState, createOrder] = useFetch<OrderResponse>({ url: END_POINTS.ORDER, method: 'POST' });

  return { createOrderState, createOrder };
};

export default usePostCreateOrder;
