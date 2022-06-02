import React from 'react';

import { Button } from 'components/common';
import * as S from 'components/cart/OrderContainer/OrderContainer.style';
import useCart from 'hooks/useCart';

function OrderContainer() {
  const { checkedProductCount, totalPrice } = useCart();

  return (
    <S.Container>
      <S.Title>결제예상금액</S.Title>
      <S.Content>
        <S.ExpectedPriceWrapper>
          <S.Label>결제예상금액</S.Label>
          <S.Price>{totalPrice}원</S.Price>
        </S.ExpectedPriceWrapper>
        <Button disabled={checkedProductCount === 0}>
          주문하기 ({checkedProductCount}개)
        </Button>
      </S.Content>
    </S.Container>
  );
}

export default OrderContainer;
