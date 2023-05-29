import { endPoints } from '../../constants/endPoints.ts';
import useFetch from '../useFetch.ts';
import { OrderResponse } from '../../types/responses/OrderResponse.ts';

const usePostCreateOrder = () => {
  const [createOrderState, createOrder] = useFetch<OrderResponse>({ url: endPoints.makeOrder, method: 'POST' });

  return { createOrderState, createOrder };
};

export default usePostCreateOrder;
