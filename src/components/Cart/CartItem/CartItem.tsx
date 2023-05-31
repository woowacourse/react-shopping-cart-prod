import type { CartItem as CartItemType } from '../../../types/types.ts';
import * as S from './CartItem.style.ts';
import trashIcon from '../../../assets/trash.png';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, switchCartCheckboxSelector } from '../../../recoil/cartAtoms.ts';
import { serverState } from '../../../recoil/serverAtom.ts';
import { fetchCartList, fetchUpdateCart } from '../../../api/api.ts';
import { fetchDeleteCart } from '../../../api/api.ts';
import checkIcon from '../../../assets/check.svg';
import StepperInput from '../../@common/StepperInput/StepperInput.tsx';

interface CartItemProps {
  cart: CartItemType;
}

function CartItem({ cart }: CartItemProps) {
  const switchCheckbox = useSetRecoilState(switchCartCheckboxSelector);
  const setCartList = useSetRecoilState(cartState);
  const server = useRecoilValue(serverState);

  const removeCartItem = async (cartId: number) => {
    if (confirm('정말로 삭제 하시겠습니까?')) {
      await fetchDeleteCart(server, cartId);
      const newCartList = await fetchCartList(server);
      setCartList(newCartList);
    }
  };

  const updateCartItemQuantity = async (newQuantity: number) => {
    if (newQuantity !== cart.quantity) {
      const cartId = cart.id;
      if (newQuantity === 0) {
        if (confirm('정말로 삭제 하시겠습니까?')) {
          await fetchDeleteCart(server, cartId);
        }
      } else {
        await fetchUpdateCart(server, cartId, newQuantity);
      }
      const newCartList = await fetchCartList(server);
      setCartList(newCartList);
    }
  };

  return (
    <S.CartItemLayout>
      <S.Label>
        <S.Input type='checkbox' icon={checkIcon} checked={cart.checked} onChange={() => switchCheckbox(cart.id)} />
      </S.Label>
      <S.CartItemImage src={cart.product.imageUrl} onClick={() => switchCheckbox(cart.id)} />
      <S.CartItemInfoWrapper>
        <S.CartItemInfo>
          <S.CartItemName onClick={() => switchCheckbox(cart.id)}>{cart.product.name}</S.CartItemName>
          <S.CartItemControllerWrapper>
            <S.CartItemTrashImage src={trashIcon} onClick={() => removeCartItem(cart.id)} />
            <StepperInput
              min={1}
              max={99}
              initialValue={cart.quantity}
              $width={115}
              getValue={updateCartItemQuantity}
            />
          </S.CartItemControllerWrapper>
        </S.CartItemInfo>
        <S.CartItemPrice>{cart.product.price.toLocaleString()}원</S.CartItemPrice>
      </S.CartItemInfoWrapper>
    </S.CartItemLayout>
  );
}

export default CartItem;
