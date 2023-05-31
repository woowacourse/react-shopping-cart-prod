import * as styled from './CartItemList.styled';
import { Checkbox } from '../../../styled/Checkbox';

import { useUpdateRecoilCart } from '../../../../hooks/useUpdateRecoilCart';
import { useMutation } from '../../../../hooks/useMutation';
import { useUpdateCheckbox } from '../../../../hooks/useUpdateCheckbox';
import { useCartStateValue } from '../../../../recoils/recoilCart';
import { useCheckedValue } from '../../../../recoils/recoilChecked';
import { useApiBaseUrlValue } from '../../../../recoils/recoilApiBaseUrl';

import { Stepper } from '../../../common/Stepper/Stepper';

import { DeleteIcon } from '../../../../assets/svg';
import { FETCH_METHOD, FETCH_URL } from '../../../../constants';

import { type CartItemType } from '../../../../types';

export const CartItemList = () => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: deleteCartMutation } = useMutation(FETCH_METHOD.DELETE);

  const { deleteRecoilCartItem } = useUpdateRecoilCart();
  const { toggleCheckbox } = useUpdateCheckbox();

  const cart = useCartStateValue();
  const checkState = useCheckedValue();

  const onChangeCheckBox = (cartItemId: CartItemType['id']) => {
    toggleCheckbox(cartItemId);
  };

  const onClickDeleteIcon = (cartItemId: CartItemType['id']) => {
    toggleCheckbox(cartItemId);

    deleteCartMutation(`${baseUrl + FETCH_URL.CART_ITEMS}/${cartItemId}`);
    deleteRecoilCartItem(cartItemId);
  };

  return (
    <styled.CartItemList>
      {cart.map(({ id, quantity, product }) => (
        <styled.CartItem key={id}>
          <styled.CartInfo>
            <styled.LeftInfo>
              <Checkbox
                type="checkbox"
                checked={Boolean(checkState[id])}
                onChange={() => onChangeCheckBox(id)}
              />
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
