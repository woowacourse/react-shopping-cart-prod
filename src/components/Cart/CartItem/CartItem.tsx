import type { CartItem } from '../../../types/types.ts';
import CartController from '../../@common/CartController/index.tsx';
import {
  CartItemControllerWrapper,
  CartItemImage,
  CartItemInfo,
  CartItemInfoWrapper,
  CartItemLayout,
  CartItemName,
  CartItemPrice,
  CartItemTrashImage,
  Input,
  Label,
} from './CartItem.style.ts';
import trashIcon from '../../../assets/trash.png';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartState, switchCartCheckboxSelector } from '../../../recoil/cartAtoms.ts';
import { serverState } from '../../../recoil/serverAtom.ts';
import { fetchCartList } from '../../../api/api.ts';
import { fetchDeleteCart } from '../../../api/api.ts';
import checkIcon from '../../../assets/check.svg';

interface CartItemProps {
  cart: CartItem;
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

  return (
    <CartItemLayout>
      <div>
        <Label>
          <Input type='checkbox' icon={checkIcon} checked={cart.checked} onChange={() => switchCheckbox(cart.id)} />
        </Label>
      </div>
      <CartItemImage
        src={cart.product.imageUrl}
        onClick={() => {
          switchCheckbox(cart.id);
        }}
      />
      <CartItemInfoWrapper>
        <CartItemInfo>
          <CartItemName
            onClick={() => {
              switchCheckbox(cart.id);
            }}
          >
            {cart.product.name}
          </CartItemName>
          <CartItemControllerWrapper>
            <CartItemTrashImage src={trashIcon} onClick={() => removeCartItem(cart.id)} />
            <CartController product={cart.product} />
          </CartItemControllerWrapper>
        </CartItemInfo>
        <CartItemPrice>{cart.product.price.toLocaleString()}원</CartItemPrice>
      </CartItemInfoWrapper>
    </CartItemLayout>
  );
}

export default CartItem;
