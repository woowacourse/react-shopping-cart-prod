import { OrderDetailInfo } from '../../types';
import * as S from './styles/OrderBill.styles';

export default function OrderBill(props: OrderDetailInfo) {
  const { coupon, totalPrice, discountedTotalPrice, couponDiscountPrice, deliveryPrice } = props;

  return (
    <S.Wrapper>
      <S.TitleBox>결제금액정보</S.TitleBox>
      <S.CouponBox>
        <S.BillRow>
          <p>사용한 쿠폰</p>
          <p>{coupon ? coupon.name : '없음'}</p>
        </S.BillRow>
      </S.CouponBox>
      <S.BillBox>
        <S.BillRow>
          <p>총 상품가격</p>
          <p>{totalPrice.toLocaleString()} 원</p>
        </S.BillRow>
        <S.BillRow>
          <p>총 배송비</p>
          <p>{deliveryPrice.toLocaleString()} 원</p>
        </S.BillRow>
        <S.CouponBillRow>
          <p>쿠폰 할인 금액</p>
          <p>{couponDiscountPrice.toLocaleString()} 원</p>
        </S.CouponBillRow>
        <S.BillRow>
          <p>총 주문금액</p>
          <p>{(discountedTotalPrice + deliveryPrice).toLocaleString()} 원</p>
        </S.BillRow>
      </S.BillBox>
    </S.Wrapper>
  );
}
