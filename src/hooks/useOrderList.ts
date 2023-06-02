import { Order } from 'src/types';
import { useRecoilValue } from 'recoil';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { USER } from 'src/constants';
import fetchData from 'src/api';
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
