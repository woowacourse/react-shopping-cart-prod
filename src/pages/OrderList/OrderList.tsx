import { getAllOrderList } from '@/api/orderList';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';
import Loading from '@/components/common/Loading/Loading';
import { withLogin } from '@/components/helper/withLogin';
import OrderInformation from '@/components/order/OrderInformation/OrderInformation';
import useResponsive from '@/hooks/useResponsive';
import { useEffect, useState } from 'react';
import PageTemplate from '../../components/common/PageTemplate/PageTemplate';
import * as Styled from './OrderList.style';

function OrderList() {
  const responsive = useResponsive();
  const [orderList, setOrderList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const {
          data: { orders },
        } = await getAllOrderList();

        setOrderList(orders);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
    };

    apiCall();
  }, []);

  if (isLoading) {
    return (
      <Loading type="page" fontSize="2rem">
        👻
      </Loading>
    );
  }

  if (isError) return <ErrorContainer>써버 에러</ErrorContainer>;

  return (
    <PageTemplate>
      <Styled.Container>
        <Styled.Title>주문목록</Styled.Title>
        {orderList.length !== 0
          ? orderList.map(order => (
              <div key={order.id}>
                <OrderInformation
                  orderList={order.orderDetails}
                  responsive={responsive}
                  orderId={order.id}
                />
              </div>
            ))
          : null}
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderList, true);
