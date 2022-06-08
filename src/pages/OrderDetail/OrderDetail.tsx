import { getOrderById } from '@/api/orderList';
import Image from '@/components/common/Image/Image';
import PageTemplate from '@/components/common/PageTemplate/PageTemplate';
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
        <Styled.OrderNumber>주문번호: {orderId}</Styled.OrderNumber>
        <Styled.OrderDetailsContainer>
          {orderList.map((order: any) => (
            <>
              <Styled.OrderItemContainer>
                <Image
                  src={order.imageURL}
                  alt="대체 이미지"
                  width={responsive === 'desktop' ? '200px' : '150px'}
                />
                <Styled.OrderDescriptionContainer>
                  <h2>{order.name}</h2>
                  <p>
                    {order.quantity * order.price}원 / 수량: {order.quantity}개
                  </p>
                </Styled.OrderDescriptionContainer>
              </Styled.OrderItemContainer>
            </>
          ))}
        </Styled.OrderDetailsContainer>
      </Styled.Container>
    </PageTemplate>
  );
}

export default OrderDetail;
