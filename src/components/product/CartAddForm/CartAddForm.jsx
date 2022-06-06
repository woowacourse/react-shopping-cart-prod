import React from 'react';

import useCart from 'hooks/useCart';
import { useCount } from 'hooks/useCount';

import { Counter } from 'components/common';

import * as S from 'components/product/CartAddForm/CartAddForm.style';

import * as GlobalStyled from 'styles/GlobalStyles';

function CartAddForm({ product: { id, name, price, stock }, closeModal }) {
  const [count, handleIncrement, handleDecrement] = useCount({
    initialValue: 1,
    min: 1,
    max: stock,
  });
  const { addProduct } = useCart();

  const onClickCartAdd = () => {
    addProduct({ id, name, count });
    closeModal();
  };

  return (
    <S.Container>
      <GlobalStyled.Position>
        <S.ProductInfoWrapper>
          <S.Name>{name}</S.Name>
          <S.Price>{price} 원</S.Price>
          <GlobalStyled.Position position="absolute" right="0" bottom="0">
            <Counter
              count={count}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </GlobalStyled.Position>
        </S.ProductInfoWrapper>
      </GlobalStyled.Position>

      <S.TotalPriceWrapper>
        <S.Title>합계</S.Title>
        <S.TotalPrice>{price * count} 원</S.TotalPrice>
      </S.TotalPriceWrapper>

      <S.Button onClick={onClickCartAdd}>장바구니에 담기</S.Button>
    </S.Container>
  );
}

export default CartAddForm;
