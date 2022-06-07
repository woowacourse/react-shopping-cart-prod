import { useCallback } from "react";
import { useSelector, useStore } from "react-redux";
import priceToDollar from "@utils/priceToDollar";
import getSelectedProductIds from "@cart/utils/getSelectedProductIds";
import Button from "@shared/button/Button";
import Highlighter from "@shared/highlighter/Highlighter";
import TitleBox from "@shared/title-box/TitleBox";
import styles from "./cart-total.module";

function CartTotal({ className }) {
  const cart = useSelector((state) => state.cart.data);
  const total = getTotal(cart);
  const selectedProductIds = getSelectedProductIds(cart);
  const selectedProductCount = selectedProductIds.length;
  const handleOrderBtnClick = useCallback(() => {
    alert("주문기능은 준비중입니다");
  }, []);

  return (
    <TitleBox className={className}>
      <TitleBox.Head>
        <h2 className={styles.title}>결제예상금액</h2>
      </TitleBox.Head>
      <TitleBox.Content>
        <div className={styles.top}>
          <Highlighter>결제예상금액</Highlighter>
          <Highlighter>{priceToDollar(total)}</Highlighter>
        </div>
        <div className={styles.bottom}>
          <Button
            variant="primary"
            block
            onClick={handleOrderBtnClick}
          >{`주문하기(${selectedProductCount}개)`}</Button>
        </div>
      </TitleBox.Content>
    </TitleBox>
  );
}

function getTotal(cart) {
  return cart.reduce((acc, cartItem) => {
    const quantity = cartItem.selected ? cartItem.quantity : 0;
    return acc + cartItem.price * quantity;
  }, 0);
}

export default CartTotal;
