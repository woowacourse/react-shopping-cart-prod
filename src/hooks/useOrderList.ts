import { Order } from 'src/types';
import { useRecoilValue } from 'recoil';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { USER } from 'src/constants';
import useGetQuery from './useGetQuery';

function useOrderList() {
  const currentServer = useRecoilValue($CurrentServerUrl);

  const { data: orderList, loading } = useGetQuery<Order[]>(`${currentServer}/orders`, {
    Authorization: `Basic ${btoa(USER)}`,
  });

  return { orderList, loading };
}

export default useOrderList;
