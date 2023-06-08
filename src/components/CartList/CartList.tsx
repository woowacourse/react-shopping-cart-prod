import { useRecoilValue } from "recoil";
import {
  allCartCheckedSelector,
  cartCountSelector,
  cartRepository,
  cartState,
  checkedCartCountSelector,
} from "../../app/recoil/cartAtoms";
import CartItem from "../CartItem";
import {
  CartListCheckCounter,
  CartListController,
  CartListWrapper,
  CartsDeleteButton,
} from "./CartList.style";

function CartList() {
  const cartList = useRecoilValue(cartState);
  const checkedCartListCount = useRecoilValue(checkedCartCountSelector);
  const cartCount = useRecoilValue(cartCountSelector);
  const isAllCartItemChecked = useRecoilValue(allCartCheckedSelector);

  const { switchAllCheckboxes, removeCheckedCartItems } =
    useRecoilValue(cartRepository);

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
        <CartsDeleteButton
          onClick={() => removeCheckedCartItems()}
          disabled={checkedCartListCount === 0}
        >
          선택삭제
        </CartsDeleteButton>
      </CartListController>
    </CartListWrapper>
  );
}

export default CartList;
