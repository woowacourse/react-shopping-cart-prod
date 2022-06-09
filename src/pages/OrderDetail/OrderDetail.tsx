import { getOrderById } from '@/api/orderList';
import ErrorContainer from '@/components/common/ErrorContainer/ErrorContainer';
import Loading from '@/components/common/Loading/Loading';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
import { withLogin } from '@/components/helper/withLogin';
import OrderInformation from '@/components/order/OrderInformation/OrderInformation';
import useResponsive from '@/hooks/useResponsive';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './OrderDetail.style';

function OrderDetail() {
  const { id: orderId } = useParams();
  const responsive = useResponsive();
  const [orderList, setOrderList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const {
          data: { order },
        } = await getOrderById(orderId);

        setOrderList(order.orderDetails);
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
    };

    apiCall();
  }, [orderId]);

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
        <Styled.Title>주문내역상세</Styled.Title>
        <OrderInformation orderList={orderList} responsive={responsive} orderId={orderId} />
      </Styled.Container>
    </PageTemplate>
  );
}

export default withLogin(OrderDetail, true);
