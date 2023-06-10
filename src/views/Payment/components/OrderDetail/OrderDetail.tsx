import { OrderItem } from "../Order";
import { useOrderItem } from "@views/Payment/recoil/orderItemState";

import * as S from "./OrderDetail.style";
function OrderDetail({ orderId }: { orderId: number }) {
  const order = useOrderItem(orderId);

  const { discountPrice, totalItemsPrice, deliveryFee } = order;

  return (
    <>
      <OrderItem order={order} />
      <S.OrderWrapper>
        <S.CouponText info={discountPrice > 0}>할인 금액</S.CouponText>
        <S.CouponText info={discountPrice > 0}>
          {Number(discountPrice)}
        </S.CouponText>
        <S.CouponText>배송비</S.CouponText>
        <S.CouponText>{Number(deliveryFee)}</S.CouponText>
        <S.ContentText>최종 결제 금액</S.ContentText>
        <S.ContentText>
          {Number(totalItemsPrice) -
            Number(discountPrice) +
            Number(deliveryFee)}
        </S.ContentText>
      </S.OrderWrapper>
    </>
  );
}

export default OrderDetail;
