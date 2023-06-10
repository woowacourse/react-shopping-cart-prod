import { CartItemBox } from "@views/Cart/components/CartItemBox";
import { CheckBox } from "@common/CheckBox";
import { useCheckCart } from "@views/Cart/hooks/useCart";

import * as S from "./CartItemList.style";
import empty from "@assets/empty.png";

function CartItemList() {
  const {
    cart,
    toggleAllCartItem,
    deleteCheckedItems,
    checkedCartCount,
    isAllChecked,
  } = useCheckCart();

  const cartLength = cart.length;

  if (cartLength === 0) {
    return (
      <S.CartWrapper>
        <S.CartImage src={empty} />
      </S.CartWrapper>
    );
  }

  return (
    <S.CartWrapper>
      {cart.map(({ id, product }) => {
        return (
          <li key={id + product.toString()}>
            <CartItemBox cartItemId={id} product={product} />
          </li>
        );
      })}
      <S.CartItemListContainer>
        <CheckBox
          type="checkbox"
          checked={isAllChecked}
          onChange={toggleAllCartItem}
        />
        <S.CheckAllSpan>{`전체 선택 (${checkedCartCount} / ${cartLength})`}</S.CheckAllSpan>
        <S.DeleteCheckBox onClick={deleteCheckedItems}>
          선택삭제
        </S.DeleteCheckBox>
      </S.CartItemListContainer>
    </S.CartWrapper>
  );
}

export default CartItemList;
