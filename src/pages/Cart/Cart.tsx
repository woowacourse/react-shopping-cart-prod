import CartList from "../../components/CartList";
import PurchaseBox from "../../components/PurchaseBox";
import { CartTitle, CartWrapper, FatBorder } from "./Cart.style.ts";
import { CartListTitle } from "../../components/CartList/CartList.style.ts";
import { useRecoilValue } from "recoil";
import { cartCountSelector } from "../../recoil/cartAtoms.ts";
import EmptyAlert from "../../components/EmptyAlert";

function Cart() {
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <div>
      <CartTitle>장바구니</CartTitle>
      <FatBorder />
      {cartCount > 0 ? (
        <>
          <CartListTitle>든든배송 상품 ({cartCount}개)</CartListTitle>
          <CartWrapper>
            <CartList />
            <PurchaseBox />
          </CartWrapper>
        </>
      ) : (
        <EmptyAlert
          message="장바구니가 비어있어요."
          goBack={true}
          goHome={true}
        />
      )}
    </div>
  );
}

export default Cart;
