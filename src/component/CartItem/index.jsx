import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import CheckBox from 'component/common/CheckBox';
import QuantityBox from 'component/common/QuantityBox';

import useSelectItem from 'hook/useSelectItem';
import useCartItem from 'hook/useCartItem';

import * as S from 'component/CartItem/style';

import {PATH} from 'constant';

export default function CartItem({cartInfo, initialChecked = false}) {
  const {selectItem, deselectItem} = useSelectItem();

  const {deleteCartItem, increaseQuantity, decreaseQuantity} = useCartItem();

  const {imageUrl, name, price, quantity, id} = cartInfo;

  return (
    <S.CartItemLayout>
      <CheckBox
        initialChecked={initialChecked}
        productId={Number.parseInt(id)}
        handleCheckedTrue={selectItem}
        handleCheckedFalse={deselectItem}
      />
      <Link to={`${PATH.DETAIL}/${id}`}>
        <img src={imageUrl} alt="장바구니 상품 이미지" width="144px" height="144px" />
      </Link>
      <S.ItemNameParagraph>{name}</S.ItemNameParagraph>
      <S.EditQuantityBox>
        <S.StyledDeleteIcon onClick={() => deleteCartItem(id)} />
        <QuantityBox
          quantity={quantity}
          handleIncrease={() => increaseQuantity(id)}
          handleDecrease={() => decreaseQuantity(id)}
        />
        <S.PriceSpan>
          {price.toLocaleString()}원 x {quantity} 개
        </S.PriceSpan>
      </S.EditQuantityBox>
    </S.CartItemLayout>
  );
}

CartItem.propTypes = {
  cartInfo: PropTypes.object,
  initialChecked: PropTypes.bool,
};
