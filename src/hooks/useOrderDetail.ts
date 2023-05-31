import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { orderDetailSelector } from '../states/order';

const useOrderDetail = () => {
  const { orderId } = useParams();

  if (!orderId) {
    throw new Error('해당 주문을 찾지 못했습니다.');
  }

  const orderDetail = useRecoilValue(orderDetailSelector(Number(orderId)));

  return orderDetail;
};

export default useOrderDetail;
