import React, { useCallback, useMemo } from 'react';

import useCart from 'hooks/useCart';

import { CheckBox, Counter, Icon, Image } from 'components/common';

import * as S from 'components/cart/CartProductCard/CartProductCard.style';

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
  
  const isSoldOut = stock === 0;

  return (
    <S.Container>
      <CheckBox checked={checked} disabled={isSoldOut} onClick={handleCheckBoxClick} />
      <Image src={imageURL} width="150px" backgroundColor={color.WHITE}/>
      <S.Description>
        <Position position="absolute" top="0" right="0">
          <S.Button type="button" onClick={handleProductDelete}>
            <Icon iconName="Trash" fill={color.DARK_GRAY} />
          </S.Button>
        </Position>
        <S.Name>{name}</S.Name>
        <Counter
          count={quantity}
          disabled={isSoldOut}
          onIncrement={handleQuantityIncrement}
          onDecrement={handleQuantityDecrement}
        />
        <S.StatusMessage>
          {
            stock === 0 ?
            '품절된 상품입니다.' : 
            quantity >= stock ? 
            '구매 가능한 최대 수량입니다.' :
            ''
          }
        </S.StatusMessage>
        <S.Price>{price * quantity}원</S.Price>
      </S.Description>
    </S.Container>
  );
}

export default CartProductCard;
