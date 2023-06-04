import * as styled from './CartItemList.styled';

import { Checkbox } from '@components/styled/Checkbox';
import { Stepper } from '@components/common/Stepper/Stepper';

import { useCartRepository, useCartItems } from '@recoils/cartAtoms';

import { DeleteIcon } from '@assets/svg';

import type { CartItem } from '../../../../types';

export const CartItemList = () => {
  const cartItems = useCartItems();
  const { deleteCartItem, toggleCheckbox } = useCartRepository();

  const onChangeCheckBox = (cartItemId: CartItem['id']) => {
    toggleCheckbox(cartItemId);
  };

  const onClickDeleteIcon = (cartItemId: CartItem['id']) => {
    deleteCartItem(cartItemId);
  };

  return (
    <styled.CartItemList>
      {cartItems.map(({ id, quantity, product, checked }) => (
        <styled.CartItem key={id}>
          <styled.CartInfo>
            <styled.LeftInfo>
              <Checkbox type="checkbox" checked={checked} onChange={() => onChangeCheckBox(id)} />
              <styled.ProductImage path={product.imageUrl} />
              <styled.ProductName>{product.name}</styled.ProductName>
            </styled.LeftInfo>
            <styled.RightInfo>
              <Stepper cartItemId={id} quantity={quantity} />
              <styled.ProductPrice>{product.price.toLocaleString('ko-KR')}원</styled.ProductPrice>
              <styled.DeleteButton onClick={() => onClickDeleteIcon(id)}>
                <DeleteIcon />
              </styled.DeleteButton>
            </styled.RightInfo>
          </styled.CartInfo>
          <styled.TotalPrice>
            상품금액 {(product.price * quantity).toLocaleString('ko-kr')}원 =&nbsp;
            <span>총 {(product.price * quantity).toLocaleString('ko-kr')}원</span>
          </styled.TotalPrice>
        </styled.CartItem>
      ))}
    </styled.CartItemList>
  );
};
