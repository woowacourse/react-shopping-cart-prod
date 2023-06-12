import { useNavigate } from "react-router-dom";

import { useRefreshCart } from "@views/Cart/recoil/cartState";
import { useRefreshProduct } from "@views/Product/recoil/productListState";
import { useCart } from "@views/Cart/hooks/useCart";

import * as S from "./CartButtonWithIcon.style";
import { FiShoppingCart } from "react-icons/fi";

function CartButtonWithIcon() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const refreshCart = useRefreshCart();
  const refreshProduct = useRefreshProduct();

  return (
    <S.CartContainer
      type="button"
      aria-label="장바구니 페이지로 가기"
      role="button"
      onClick={() => {
        refreshCart();
        refreshProduct();
        navigate("/cart");
      }}
    >
      <S.CartWrapper>
        <FiShoppingCart />
        <S.CartCountWrapper>
          <S.CartCount aria-live="polite">{cart.length}</S.CartCount>
        </S.CartCountWrapper>
      </S.CartWrapper>
    </S.CartContainer>
  );
}

export default CartButtonWithIcon;
