import { OrderDetailType } from 'types';
import { formatPrice } from 'utils';
import * as S from './Payment.styles';

const Payment = ({ order }: { order: OrderDetailType }) => {
  const calculateTotalPrice = () => {
    const orderedItems = order.orderedItems;
    return orderedItems.reduce((acc, cur) => acc + cur.totalPrice, 0);
  };

  const calculateTotalDiscountPrice = () => {
    const salePrice = order.orderedItems.reduce(
      (acc, cur) => acc + cur.totalDiscountPrice,
      0
    );
    return salePrice + order.discountFromTotalPrice;
  };

  const calculateOrderPrice = () => {
    return (
      calculateTotalPrice() +
      order.deliveryPrice -
      calculateTotalDiscountPrice()
    );
  };

  return (
    <>
      <S.Container>
        <S.Title>결제 금액</S.Title>
        <S.Wrapper>
          <S.Text>상품 가격</S.Text>
          <S.Text>{formatPrice(calculateTotalPrice())}원</S.Text>
        </S.Wrapper>
        <S.Wrapper>
          <S.Text>배송비</S.Text>
          <S.Text>{formatPrice(order.deliveryPrice)}원</S.Text>
        </S.Wrapper>
        <S.Wrapper>
          <S.Text>할인 금액</S.Text>
          <S.Text>-{formatPrice(calculateTotalDiscountPrice())}원</S.Text>
        </S.Wrapper>
        <S.Wrapper>
          <S.Text>결제 금액</S.Text>
          <S.Text>{formatPrice(calculateOrderPrice())}원</S.Text>
        </S.Wrapper>
      </S.Container>
    </>
  );
};

export default Payment;
