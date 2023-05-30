import { OrderDetail } from 'src/types';
import { useRecoilValue } from 'recoil';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { USER } from 'src/constants';
import useGetQuery from './useGetQuery';

interface UseOrderDetailProps {
  orderId: string | null;
}

function useOrderDetail({ orderId }: UseOrderDetailProps) {
  if (!orderId) {
    throw new Error('존재하지 않는 id 입니다.');
  }

  const currentServer = useRecoilValue($CurrentServerUrl);

  const { data: orderDetailData, loading } = useGetQuery<OrderDetail>(`${currentServer}/orders/${orderId}`, {
    Authorization: `Basic ${btoa(USER)}`,
  });

  return { orderDetailData, loading };
}

export default useOrderDetail;
