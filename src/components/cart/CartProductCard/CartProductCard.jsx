import React from 'react';

import useCart from 'hooks/useCart';

import { CheckBox, Counter, Icon, Image } from 'components/common';

import * as S from 'components/cart/CartProductCard/CartProductCard.style';

import { WARNING_MESSAGES } from 'constants/messages';

import { Position } from 'styles/GlobalStyles';
import { color } from 'styles/Theme.js';

const NotConfirmDecrement = (quantity, stock) =>
  !window.confirm(WARNING_MESSAGES.DECREASE_TO_STOCK(quantity, stock));

function CartProductCard({
  product: { id: productId, name, price, imageUrl, stock },
  quantity,
}) {
  const {
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
    isChecked,
    toggleCheck,
  } = useCart();

  const isSoldOut = stock === 0;
  const isMoreThanStock = quantity >= stock;
  const counterValue = Math.min(stock, quantity);
  const checked = isChecked(productId);

  const handleIncrementQuantity = async () => {
    if (isMoreThanStock) {
      alert(WARNING_MESSAGES.MAX_QUANTITY);
      return;
    }

    try {
      await incrementCartProduct(productId, quantity);
    } catch ({ message }) {
      alert(message);
    }
  };

  const handleDecrementQuantity = async () => {
    let currentQuantity = quantity;

    if (currentQuantity === 1) {
      alert(WARNING_MESSAGES.MIN_QUANTITY);
      return;
    }

    if (quantity > stock) {
      if (NotConfirmDecrement(quantity, stock)) {
        return;
      }
      currentQuantity = stock;
    }

    try {
      await decrementCartProduct(productId, currentQuantity);
    } catch ({ message }) {
      alert(message);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct([productId]);
    } catch ({ message }) {
      alert(message);
    }
  };

  const handleClickCheckBox = () => toggleCheck(productId);

  return (
    <S.Container>
      <CheckBox checked={checked} disabled={isSoldOut} onClick={handleClickCheckBox} />
      <Image src={imageUrl} width="150px" backgroundColor={color.WHITE} />
      <S.Description>
        <Position position="absolute" top="0" right="0">
          <S.Button type="button" onClick={handleDeleteProduct}>
            <Icon iconName="Trash" fill={color.DARK_GRAY} />
          </S.Button>
        </Position>
        <S.Name>{name}</S.Name>
        <Counter
          count={counterValue}
          disabled={isSoldOut}
          onIncrement={handleIncrementQuantity}
          onDecrement={handleDecrementQuantity}
        />
        <S.StatusMessage>
          {isSoldOut
            ? '품절된 상품입니다.'
            : isMoreThanStock
            ? '구매 가능한 최대 수량입니다.'
            : ''}
        </S.StatusMessage>
        <S.Price>{isSoldOut ? 0 : (price * quantity).toLocaleString('ko-KR')} 원</S.Price>
      </S.Description>
    </S.Container>
  );
}

export default CartProductCard;
