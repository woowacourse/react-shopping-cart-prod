import { useOrderItem } from '@views/Payment/recoil/orderItemState';
import { OrderItem } from '../Order';
import { styled } from 'styled-components';

function OrderDetail({ orderId }: { orderId: number }) {
  const order = useOrderItem(orderId);

  const { discountPrice, totalItemsPrice, deliveryFee } = order;

  return (
    <>
      <OrderItem order={order} />
      <OrderWrapper>
        <CouponText info={discountPrice > 0}>할인 금액</CouponText>
        <CouponText info={discountPrice > 0}>{Number(discountPrice)}</CouponText>
        <CouponText>배송비</CouponText>
        <CouponText>{Number(deliveryFee)}</CouponText>
        <ContentText>최종 결제 금액</ContentText>
        <ContentText>
          {Number(totalItemsPrice) - Number(discountPrice) + Number(deliveryFee)}
        </ContentText>
      </OrderWrapper>
    </>
  );
}

export default OrderDetail;

const OrderWrapper = styled.div`
  text-align: right;
`;

export const ContentText = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0.5rem;
`;

export const CouponText = styled(ContentText)<{ info?: boolean }>`
  color: ${({ theme, info }) => (info ? theme.infoColor : theme.secondaryColor)};
  font-weight: ${({ info }) => (info ? 800 : 400)};
`;
