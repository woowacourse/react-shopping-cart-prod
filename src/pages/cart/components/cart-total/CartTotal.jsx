import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "@redux/reducers/order-reducer/orderThunks";

import Button from "@components/button/Button";
import Highlighter from "@components/highlighter/Highlighter";
import TitleBox from "@components/title-box/TitleBox";

import priceToDollar from "@utils/priceToDollar";
import getSelectedCartItemIds from "@cart/utils/getSelectedCartItemIds";
import styles from "./cart-total.module";

function CartTotal({ className }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);

  const total = getTotal(cart);
  const selectedCartItemIds = getSelectedCartItemIds(cart);
  const selectedCartItemCount = selectedCartItemIds.length;

  const handleOrderBtnClick = useCallback(() => {
    dispatch(createOrder({ cartItemIds: selectedCartItemIds }));
  }, [dispatch, selectedCartItemIds]);

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
          >{`주문하기(${selectedCartItemCount}개)`}</Button>
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
