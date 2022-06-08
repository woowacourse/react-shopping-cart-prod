import Image from '@/components/common/Image/Image';
import * as Styled from './OrderInformation.style';

function OrderInformation({ orderId, orderList, responsive }) {
  return (
    <>
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
    </>
  );
}

export default OrderInformation;
