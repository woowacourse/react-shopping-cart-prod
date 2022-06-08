import React, { useEffect, useState } from "react";

import { useStore } from "hooks/useStore";
import { getCartList } from "reducers/cartList";

import PageHeader from "components/common/PageHeader";
import PaymentAmount from "./PaymentAmount";
import ProductCartList from "./ProductCartList";
import { CartPageContainer, CartPageList, CartPagePayment } from "./styled";

function ProductCartPage({ serverUrlIndex }) {
  const { data: cartList, isLoading, dispatch } = useStore("cartList");

  const [checkList, setCheckList] = useState([]);

  const [totalPrice, totalCount] = cartList.reduce(
    (acc, { productId, price, count }) => {
      if (checkList.includes(productId)) {
        acc[0] += price * count;
        acc[1] += count;
      }
      return acc;
    },
    [0, 0]
  );

  useEffect(() => {
    dispatch(getCartList(serverUrlIndex));
  }, []);

  useEffect(() => {
    if (!isLoading)
      setCheckList(cartList.map((cartItem) => cartItem.productId));
  }, [isLoading]);

  return (
    <CartPageContainer>
      <PageHeader>장바구니</PageHeader>
      <CartPageList>
        <ProductCartList checkList={checkList} setCheckList={setCheckList} />
      </CartPageList>
      <CartPagePayment>
        <PaymentAmount
          position="sticky"
          totalPrice={totalPrice}
          totalCount={totalCount}
        />
      </CartPagePayment>
    </CartPageContainer>
  );
}

export default ProductCartPage;
