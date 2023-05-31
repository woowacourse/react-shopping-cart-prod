import { useParams } from 'react-router-dom';
import PageTemplate from '../../templates/PageTemplate';
import { useQuery } from 'react-query';
import { OrderDetailType } from '../../../types/types';

const OrderDetailPage = () => {
  const orderId = useParams().orderId;

  const { data: orderDetailData, refetch } = useQuery<OrderDetailType>(
    'orderDetail',
    async () => {
      const res = await fetch(`/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      return data;
    },
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  console.log(orderDetailData);
  return (
    <PageTemplate
      title="장바구니 미션- 주문 상세보기 페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 주문 상세보기 페이지입니다."
    >
      <div>{orderId}디테일페이지로 이동했습니다.</div>
    </PageTemplate>
  );
};

export default OrderDetailPage;
