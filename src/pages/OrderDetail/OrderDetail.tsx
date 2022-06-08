import { getOrderById } from '@/api/orderList';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import { withLogin } from '@/components/helper/withLogin';
import OrderInformation from '@/components/order/OrderInformation/OrderInformation';
import useResponsive from '@/hooks/useResponsive';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './OrderDetail.style';

function OrderDetail() {
  const responsive = useResponsive();
  const { id: orderId } = useParams();
  const [orderList, setOrderList] = useState<any>([]);

  useEffect(() => {
    const apiCall = async () => {
      const {
        data: { order },
      } = await getOrderById(orderId);

      setOrderList(order.orderDetails);
    };
    apiCall();
  }, [orderId]);

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문내역상세</Styled.Title>
        <OrderInformation orderList={orderList} responsive={responsive} orderId={orderId} />
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderDetail, true);
