import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { cartActions } from 'redux/actions';
import { getCarts } from 'redux/thunks/cart';

import CheckBox from 'components/@shared/CheckBox';
import Link from 'components/@shared/Link';
import NumberInput from 'components/@shared/NumberInput';

import cartAPI from 'apis/cart';
import { ReactComponent as Delete } from 'assets/Delete.svg';
import { CART_MESSAGE } from 'constants/message';
import PATH from 'constants/path';
import { CartStoreState } from 'types';
import { Product } from 'types/product';

type Props = {
  cartItemId: number;
  product: Product;
  quantity: number;
  checked: boolean;
};

// TODO: 선택 구현
function CartItem({ cartItemId, product, quantity }: Props) {
  const { id, name, imageUrl } = product;
  const dispatch = useDispatch();
  const { checkedCartItems } = useSelector(
    (state: { cart: CartStoreState }) => state.cart
  );

  const isChecked = checkedCartItems.includes(cartItemId);

  const onClickDeleteButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      cartAPI.deleteCartItem(cartItemId).then((res) => {
        res?.status === 204 && dispatch(getCarts());
      });
    }
  };

  const onChangeCheckBox = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();

    if (!isChecked) {
      dispatch(cartActions.checkCartItem(cartItemId));

      return;
    }

    dispatch(cartActions.uncheckCartItem(cartItemId));
  };

  const onChangeCartItemQuantity =
    (cartItemId: number) => (quantity: number) => {
      cartAPI.changeCartItemQuantity(cartItemId, quantity).then((res) => {
        dispatch(getCarts());
      });
    };

  return (
    <Link to={`${PATH.PRODUCT}/${id}`}>
      <StyledCartItem>
        <CheckBox
          id={id + ''}
          checked={isChecked}
          onChange={onChangeCheckBox}
        />
        <img src={imageUrl} alt={name} />
        <StyledProductName>{name}</StyledProductName>
        <StyledDeleteButton type="button" onClick={onClickDeleteButton}>
          <Delete />
        </StyledDeleteButton>
        <NumberInput
          value={quantity}
          setValue={onChangeCartItemQuantity(cartItemId)}
        />
        <StyledPrice>
          {(product.price * quantity).toLocaleString('ko-KR')} 원
        </StyledPrice>
      </StyledCartItem>
    </Link>
  );
}

const StyledCartItem = styled.div`
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  img {
    aspect-ratio: 1 / 1;
    height: 110px;
    margin: 0 10px;
  }
`;

const StyledProductName = styled.div`
  position: relative;
  top: -105px;
  left: 150px;

  width: fit-content;
`;

const StyledDeleteButton = styled.button`
  position: relative;
  top: -125px;
  float: right;

  background: none;
`;

const StyledPrice = styled.div`
  position: relative;
  top: -35px;
  left: 105px;
  float: right;

  font-size: 14px;
`;

export default CartItem;
