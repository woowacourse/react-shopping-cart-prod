import useFetch from '../useFetch.ts';
import { END_POINTS } from '../../constants/END_POINTS.ts';
import { OrdersResponse } from '../../types/responses/OrderResponse.ts';

const useGetOrderList = () => {
  const [{ status, data }, refetchOrderList] = useFetch<OrdersResponse>({ url: END_POINTS.ORDER });

  return { status, data, refetchOrderList };
};

export default useGetOrderList;
