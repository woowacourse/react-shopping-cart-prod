import { CART_MESSAGE } from 'constants/message';
import CheckBox from 'components/@shared/CheckBox';
import { ReactComponent as Delete } from 'assets/Delete.svg';
import Link from 'components/@shared/Link';
import NumberInput from 'components/@shared/NumberInput';
import PATH from 'constants/path';
import { Product } from 'types/index';
import { cartActions } from 'redux/actions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import cartAPI from 'apis/cart';
import { useState } from 'react';

type Props = {
  product: Product;
  stock: number;
  checked: boolean;
  cartId: number;
  checkCartItem: (targetId: number) => void;
};

function CartItem({ cartId, product, stock, checked, checkCartItem }: Props) {
  const { id, name, imageUrl } = product;
  const dispatch = useDispatch();

  const onClickDeleteButton = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (window.confirm(CART_MESSAGE.ASK_DELETE)) {
      const cartList = await cartAPI.deleteCartItem(cartId);
      dispatch(cartActions.setCartItemList(cartList));
    }
  };

  const onChangeCheckBox = (
    e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLElement>
  ) => {
    e.preventDefault();
    checkCartItem(cartId);
  };

  const onChangeCartStock = async (value: number) => {
    const cartList = await cartAPI.updateCartItemQuantity(cartId, value);
    dispatch(cartActions.setCartItemList(cartList));
  };

  return (
    <Link to={`${PATH.PRODUCT}/${id}`}>
      <StyledCartItem>
        <CheckBox id={id + ''} checked={checked} onChange={onChangeCheckBox} />
        <img src={imageUrl} alt={name} />
        <StyledProductName>{name}</StyledProductName>
        <StyledDeleteButton type="button" onClick={onClickDeleteButton}>
          <Delete />
        </StyledDeleteButton>
        <NumberInput value={stock} setValue={onChangeCartStock} />
        <StyledPrice>
          {(product.price * stock).toLocaleString('ko-KR')} 원
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
