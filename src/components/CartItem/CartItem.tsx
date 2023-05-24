import type { CartItem } from "../../types/types";
import CartController from "../CartController";
import {
  CartItemControllerWrapper,
  CartItemImage,
  CartItemInfo,
  CartItemInfoWrapper,
  CartItemLayout,
  CartItemName,
  CartItemPrice,
  CartItemTrashImage,
} from "./CartItem.style";
import trashIcon from "../../assets/trash.png";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cartState,
  switchCartCheckboxSelector,
} from "../../recoil/cartAtoms.ts";
import { serverState } from "../../recoil/serverAtom.ts";
import { fetchCartList } from "../../api/api.ts";
import { fetchDeleteCart } from "../../api/api.ts";

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
        <input
          type="checkbox"
          checked={cart.checked}
          onChange={() => {
            switchCheckbox(cart.id);
          }}
        />
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
            <CartItemTrashImage
              src={trashIcon}
              onClick={() => removeCartItem(cart.id)}
            />
            <CartController product={cart.product} />
          </CartItemControllerWrapper>
        </CartItemInfo>
        <CartItemPrice>{cart.product.price.toLocaleString()}원</CartItemPrice>
      </CartItemInfoWrapper>
    </CartItemLayout>
  );
}

export default CartItem;
