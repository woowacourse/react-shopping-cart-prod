import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import {
  allCartCheckedSelector,
  cartCountSelector,
  cartState,
  checkedCartCountSelector,
  checkedCartSelector,
} from "../../recoil/cartAtoms";
import CartItem from "../CartItem";
import {
  CartListCheckCounter,
  CartListController,
  CartListWrapper,
  CartsDeleteButton,
} from "./CartList.style";
import { fetchCartList, fetchDeleteCart } from "../../api/api";
import { serverState } from "../../recoil/serverAtom";
import type { ReceivedCartItem } from "../../types/types";

function CartList() {
  const [cartList, setCartList] = useRecoilState(cartState);
  const checkedCartList = useRecoilValue(checkedCartSelector);
  const checkedCartListCount = useRecoilValue(checkedCartCountSelector);
  const cartCount = useRecoilValue(cartCountSelector);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);
  const server = useRecoilValue(serverState);

  const switchAllCheckboxes = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const cartList = await snapshot.getPromise(cartState);
        const isAllCartItemChecked = await snapshot.getPromise(
          allCartCheckedSelector
        );
        const newCartList = cartList.map((cartItem: ReceivedCartItem) => ({
          ...cartItem,
          checked: !isAllCartItemChecked,
        }));
        set(cartState, newCartList);
      },
    []
  );

  const removeCheckedCartItems = async () => {
    if (confirm("정말로 삭제 하시겠습니까?")) {
      const targetIds = checkedCartList.map((cartList) => cartList.id);
      await Promise.all(
        targetIds.map((cartId) => fetchDeleteCart(server, cartId))
      );
      const newCartList = await fetchCartList(server);
      setCartList(newCartList);
    }
  };

  return (
    <CartListWrapper>
      {cartList.map((cart) => (
        <CartItem key={cart.id} cart={cart} />
      ))}
      <CartListController>
        <input
          type="checkbox"
          checked={isAllCartItemChecked}
          onChange={() => switchAllCheckboxes()}
        />
        <CartListCheckCounter onClick={() => switchAllCheckboxes()}>
          전체선택 ({checkedCartListCount}/{cartCount})
        </CartListCheckCounter>
        <CartsDeleteButton onClick={() => removeCheckedCartItems()}>
          선택삭제
        </CartsDeleteButton>
      </CartListController>
    </CartListWrapper>
  );
}

export default CartList;
