import useFetch from '../useFetch.ts';
import { END_POINTS } from '../../constants/END_POINTS.ts';
import { OrderResponse } from '../../types/responses/OrderResponse.ts';

const useGetOrderDetail = (orderID: string) => {
  const [{ data, status }, fetchOrderDetail] = useFetch<OrderResponse>({ url: `${END_POINTS.ORDER}/${orderID}`, isNotAutomaticallyFetched: true });

  return { data, status, fetchOrderDetail };
};

export default useGetOrderDetail;
