import { useRecoilValue } from 'recoil';
import fetchData from 'src/api';
import { USER } from 'src/constants';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { OrderDetail } from 'src/types';
import useFetch from './useFetch';

interface UseOrderDetailProps {
  orderId: string | null;
}

function useOrderDetail({ orderId }: UseOrderDetailProps) {
  const currentServer = useRecoilValue($CurrentServerUrl);

  const { result: orderDetailData } = useFetch({
    fetch: fetchData<OrderDetail>,
    arg: {
      url: `${currentServer}/orders/${orderId}`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
        },
      },
    },
    key: `orders/${orderId}`,
    suspense: true,
  });

  return { orderDetailData };
}

export default useOrderDetail;
