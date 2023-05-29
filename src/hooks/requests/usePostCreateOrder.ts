import { endPoints } from '../../constants/endPoints.ts';
import useFetch from '../useFetch.ts';
import { OrderResponse } from '../../types/responses/postOrderResponse.ts';

const usePostCreateOrder = () => {
  const [createOrderState, createOrder] = useFetch<OrderResponse>({ url: endPoints.order, method: 'POST' });

  return { createOrderState, createOrder };
};

export default usePostCreateOrder;
