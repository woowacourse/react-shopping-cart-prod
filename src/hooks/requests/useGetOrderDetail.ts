import useFetch from '../useFetch.ts';
import { endPoints } from '../../constants/endPoints.ts';
import { OrderResponse } from '../../types/responses/OrderResponse.ts';

const useGetOrderDetail = (orderID: string) => {
  const [{ data, status }, fetchOrderDetail] = useFetch<OrderResponse>({ url: `${endPoints.order}/${orderID}`, isNotAutomaticallyFetched: true });

  return { data, status, fetchOrderDetail };
};

export default useGetOrderDetail;
