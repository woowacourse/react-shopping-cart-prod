import { useRecoilValue } from 'recoil';
import fetchData from 'src/api';
import { USER } from 'src/constants';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { Order } from 'src/types';
import useFetch from './useFetch';

function useOrderList() {
  const currentServer = useRecoilValue($CurrentServerUrl);

  const { result: orderList } = useFetch({
    fetch: fetchData<Order[]>,
    arg: {
      url: `${currentServer}/orders/`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
        },
      },
    },
    key: `orders`,
    suspense: true,
  });

  return { orderList };
}

export default useOrderList;
