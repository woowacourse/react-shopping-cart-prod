import { getAllOrderList } from '@/api/orderList';
import { withLogin } from '@/components/helper/withLogin';
import OrderInformation from '@/components/order/OrderInformation/OrderInformation';
import useResponsive from '@/hooks/useResponsive';
import { useEffect, useState } from 'react';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import * as Styled from './OrderList.style';

function OrderList() {
  const [orderList, setOrderList] = useState<any>([]);
  const responsive = useResponsive();

  useEffect(() => {
    const apiCall = async () => {
      const {
        data: { orders },
      } = await getAllOrderList();

      setOrderList(orders);
    };

    apiCall();
  }, []);

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문목록</Styled.Title>
        {orderList.length !== 0 ? (
          orderList.map(order => (
            <div key={order.id}>
              <OrderInformation
                orderList={order.orderDetails}
                responsive={responsive}
                orderId={order.id}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderList, true);
