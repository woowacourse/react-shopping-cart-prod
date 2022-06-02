import React, { useCallback, useMemo } from 'react';

import { CheckBox, Counter, Icon, Image } from 'components/common';

import { Position } from 'styles/GlobalStyles';
import { color } from 'styles/Theme.js';
import * as S from 'components/cart/CartProductCard/CartProductCard.style';
import useCart from 'hooks/useCart';

function CartProductCard({
  product: { id: productId, name, price, imageURL },
  quantity,
}) {
  const {
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
    isChecked,
    toggleCheck,
  } = useCart();

  const handleQuantityIncrement = useCallback(
    () => incrementCartProduct(productId, quantity),
    [quantity],
  );

  const handleQuantityDecrement = useCallback(
    () => decrementCartProduct(productId, quantity),
    [quantity],
  );

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
          count={quantity}
          onIncrement={handleQuantityIncrement}
          onDecrement={handleQuantityDecrement}
        />
        <S.Price>{price * quantity}원</S.Price>
      </S.Description>
    </S.Container>
  );
}

export default CartProductCard;
