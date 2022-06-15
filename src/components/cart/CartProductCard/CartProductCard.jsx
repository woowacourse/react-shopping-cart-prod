import React from 'react';

import useCart from 'hooks/useCart';

import { CheckBox, Counter, Icon, Image } from 'components/common';

import * as S from 'components/cart/CartProductCard/CartProductCard.style';
import {
  STATUS_SOLD_OUT,
  STATUS_MORE_THAN_STOCK,
  STATUS_NORMAL,
  STATUS_MESSAGE,
} from 'components/cart/CartProductCard/constant';

import { WARNING_MESSAGES } from 'constants/messages';

import { Position } from 'styles/GlobalStyles';
import { color } from 'styles/Theme.js';

const NotConfirmDecrement = (quantity, stock) =>
  !window.confirm(WARNING_MESSAGES.DECREASE_TO_STOCK(quantity, stock));

const isSoldOut = (stock) => stock === 0;
const isMoreThanStock = (stock, quantity) => stock <= quantity;

const determineStatus = (stock, quantity) => {
  if (isSoldOut(stock)) {
    return STATUS_SOLD_OUT;
  }

  if (isMoreThanStock(stock, quantity)) {
    return STATUS_MORE_THAN_STOCK;
  }

  return STATUS_NORMAL;
};

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

  const cartProductStatus = determineStatus(stock, quantity);

  const counterValue = Math.min(stock, quantity);
  const checked = isChecked(productId);

  const handleIncrementQuantity = async () => {
    if (cartProductStatus === STATUS_MORE_THAN_STOCK) {
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
      <CheckBox
        checked={checked}
        disabled={cartProductStatus === STATUS_SOLD_OUT}
        onClick={handleClickCheckBox}
      />
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
          disabled={cartProductStatus === STATUS_SOLD_OUT}
          onIncrement={handleIncrementQuantity}
          onDecrement={handleDecrementQuantity}
        />
        {cartProductStatus !== STATUS_NORMAL && (
          <S.StatusMessage>{STATUS_MESSAGE[cartProductStatus]}</S.StatusMessage>
        )}
        <S.Price cartProductStatus={cartProductStatus}>
          {cartProductStatus === STATUS_SOLD_OUT
            ? 0
            : (price * quantity).toLocaleString('ko-KR')}{' '}
          원
        </S.Price>
      </S.Description>
    </S.Container>
  );
}

export default CartProductCard;
