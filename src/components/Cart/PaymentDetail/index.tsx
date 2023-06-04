import { getCouponApplied } from 'api/requests';
import { useGet } from 'hooks/useGet';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cartListAtom, checkedItemsAtom, couponIdAtom } from 'recoil/cartList';
import { CouponAppliedPriceResponse } from 'types/api';
import { formatPrice } from 'utils';
import * as S from './PaymentDetail.styles';

const PaymentDetail = () => {
  const dependency = useRecoilValue(couponIdAtom);
  const checkedItems = useRecoilValue(checkedItemsAtom);
  const cartList = useRecoilValue(cartListAtom);

  const { data } = useGet<CouponAppliedPriceResponse>(
    getCouponApplied(),
    dependency
  );

  const navigate = useNavigate();

  const onOrderButtonClick = () => {
    navigate('/order');
  };

  const calculateDeliveryPrice = () => {
    if (!data) return 0;
    return data.deliveryPrice.originalPrice - data.deliveryPrice.discountPrice;
  };

  const calculateTotalPrice = () => {
    if (!data) return 0;

    return data.cartItemsPrice.reduce((acc, cur) => {
      const quantity =
        cartList.find((item) => item.id === cur.cartItemId)?.quantity ?? 0;
      return acc + cur.originalPrice * quantity;
    }, 0);
  };

  const calculateTotalDiscountPrice = () => {
    if (!data) return 0;

    const discountPrice = data.cartItemsPrice.reduce((acc, cur) => {
      if (!checkedItems.includes(cur.cartItemId)) return acc;
      const quantity =
        cartList.find((item) => item.id === cur.cartItemId)?.quantity ?? 0;
      return acc + cur.discountPrice * quantity;
    }, 0);

    const couponDiscountPrice = data.discountFromTotalPrice.discountPrice;
    return discountPrice + couponDiscountPrice;
  };

  const calculateOrderPrice = () => {
    if (!data) return 0;
    return (
      calculateDeliveryPrice() +
      calculateTotalPrice() -
      calculateTotalDiscountPrice()
    );
  };

  return (
    <S.Container>
      <S.Title>결제 예상 금액</S.Title>
      <S.Wrapper>
        <S.Text>총 상품 가격</S.Text>
        <S.Text>{formatPrice(calculateTotalPrice())}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 배송비</S.Text>
        <S.Text>{formatPrice(calculateDeliveryPrice())}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 할인 금액</S.Text>
        <S.Text>-{formatPrice(calculateTotalDiscountPrice())}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 주문 금액</S.Text>
        <S.Text>{formatPrice(calculateOrderPrice())}원</S.Text>
      </S.Wrapper>
      <S.OrderButton onClick={onOrderButtonClick}>주문하기</S.OrderButton>
    </S.Container>
  );
};

export default PaymentDetail;
