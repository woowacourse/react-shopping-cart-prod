import useFetch from '../useFetch.ts';
import { endPoints } from '../../constants/endPoints.ts';
import { OrdersResponse } from '../../types/responses/OrderResponse.ts';

const useGetOrderList = () => {
  const [{ status, data }, refetchOrderList] = useFetch<OrdersResponse>({ url: endPoints.order });

  return { status, data, refetchOrderList };
};

export default useGetOrderList;
