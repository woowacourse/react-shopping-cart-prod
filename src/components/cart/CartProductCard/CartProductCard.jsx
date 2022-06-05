import React, { useCallback, useMemo } from 'react';

import useCart from 'hooks/useCart';

import { CheckBox, Counter, Icon, Image } from 'components/common';

import * as S from 'components/cart/CartProductCard/CartProductCard.style';

import { ERROR_MESSAGES, WARNING_MESSAGES } from 'constants/messages';

import { Position } from 'styles/GlobalStyles';
import { color } from 'styles/Theme.js';

function CartProductCard({
  product: { id: productId, name, price, imageURL, stock },
  quantity,
}) {
  const {
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
    isChecked,
    toggleCheck,
  } = useCart();

  const availableProductQuantity = Math.min(stock, quantity);
  const errorMessage = useMemo(() => {
    if (stock === 0) {
      return ERROR_MESSAGES.OUT_OF_STOCK;
    }
    if (stock <= quantity) {
      return WARNING_MESSAGES.MAX_QUANTITY;
    }
    return '';
  }, [stock, quantity]);

  const handleQuantityIncrement = useCallback(() => {
    if (availableProductQuantity === stock) {
      alert(WARNING_MESSAGES.MAX_QUANTITY);
      return;
    }
    incrementCartProduct(productId, availableProductQuantity);
  }, [quantity]);

  const handleQuantityDecrement = useCallback(() => {
    if (
      availableProductQuantity !== quantity &&
      !window.confirm(
        `기존에 장바구니에 추가된 수량은 ${quantity}개 입니다. 수량을 ${
          availableProductQuantity - 1
        }개로 조정하시겠습니까?`,
      )
    ) {
      return;
    }
    decrementCartProduct(productId, availableProductQuantity);
  }, [quantity]);

  const handleProductDelete = useCallback(() => deleteProduct([productId]), []);

  const checked = useMemo(() => isChecked(productId), [isChecked]);

  const handleCheckBoxClick = useCallback(() => toggleCheck(productId), []);

  return (
    <S.Container>
      <CheckBox checked={checked} onClick={handleCheckBoxClick} />

      <Image src={imageURL} width="150px" />

      <S.Description>
        <Position position="absolute" top="0" right="0">
          <S.Button type="button" onClick={handleProductDelete}>
            <Icon iconName="Trash" fill={color.DARK_GRAY} />
          </S.Button>
        </Position>
        <S.Name>{name}</S.Name>
        <Counter
          count={availableProductQuantity}
          onIncrement={handleQuantityIncrement}
          onDecrement={handleQuantityDecrement}
        />
        <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
        <S.Price>{price * availableProductQuantity}원</S.Price>
      </S.Description>
    </S.Container>
  );
}

export default CartProductCard;
