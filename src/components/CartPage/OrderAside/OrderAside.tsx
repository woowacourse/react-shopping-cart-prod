import { totalPriceSelector } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import { useOrderMutate } from '../../../hooks/order/order';
import * as S from './OrderAside.styles';

const OrderAside = () => {
  const { originPrice, totalPrice, discountPrice } =
    useRefreshableRecoilValue(totalPriceSelector);
  const { order } = useOrderMutate();

  return (
    <S.Root>
      <S.Title>결제예상금액</S.Title>
      <S.TextWrapper>
        <S.Text>총 상품가격</S.Text>
        <S.Text>{originPrice.toLocaleString()}원</S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>할인 금액</S.Text>
        <S.Text color="red">
          {discountPrice
            ? (discountPrice * -1).toLocaleString()
            : discountPrice}
          원
        </S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>총 주문금액</S.Text>
        <S.Text>{totalPrice ? totalPrice.toLocaleString() : 0}원</S.Text>
      </S.TextWrapper>
      <S.OrderButton size="L" view="black" onClick={order}>
        주문하기
      </S.OrderButton>
    </S.Root>
  );
};

export default OrderAside;
