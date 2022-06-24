import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useFetch from "@hooks/useFetch";

import Button from "@components/Button";
import Highlighter from "@components/HighlightedText";
import TitleBox from "@components/TitleBox";

import priceToDollar from "@utils/priceToDollar";
import getSelectedCartItemIds from "../utils/getSelectedCartItemIds";
import styles from "./CartTotal.module";

import {
  API_SERVER,
  FETCH_STATUS,
  REQUEST_METHOD,
} from "../../../constants/index";

function CartTotal({ className }) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartReducer.data);

  const total = getTotal(cart);
  const selectedCartItemIds = getSelectedCartItemIds(cart);
  const selectedCartItemCount = selectedCartItemIds.length;

  const {
    fetch: createOrder,
    status: createOrderStatus,
    error: createOrderError,
  } = useFetch({
    method: REQUEST_METHOD.POST,
    url: `${API_SERVER.BASE_URL}${API_SERVER.PATH.MY_ORDERS}`,
    responseDataExist: false,
  });

  const handleClickOrderButton = useCallback(() => {
    createOrder({ cartItemIds: selectedCartItemIds });
  }, [createOrder, selectedCartItemIds]);

  useEffect(() => {
    if (createOrderStatus === FETCH_STATUS.SUCCESS) {
      alert("주문 성공! 😉");
      navigate("/order-list");
    }
    if (createOrderStatus === FETCH_STATUS.FAIL) {
      alert("주문 실패! 다시 시도해주세요. 😂");
    }
  }, [createOrderStatus, navigate]);

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
            onClick={handleClickOrderButton}
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
