import React, { useEffect, useState } from "react";

import { useStore } from "hooks/useStore";
import { getCartList } from "reducers/cartList";

import PageHeader from "components/common/PageHeader";
import PaymentAmount from "./PaymentAmount";
import ProductCartList from "./ProductCartList";
import { CartPageContainer, CartPageList, CartPagePayment } from "./styled";
import { Navigate } from "react-router-dom";
import { ROUTES } from "constants";
import { useSelector } from "react-redux";

function ProductCartPage() {
  const { data: cartList, isLoading, dispatch } = useStore("cartList");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [checkList, setCheckList] = useState([]);

  const [totalPrice, totalCount] = cartList.reduce(
    (acc, { id, price, count }) => {
      if (checkList.includes(id)) {
        acc[0] += price * count;
        acc[1] += count;
      }
      return acc;
    },
    [0, 0]
  );

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    if (!isLoading) setCheckList(cartList.map((cartItem) => cartItem.id));
  }, [isLoading]);

  return !isLoggedIn ? (
    <Navigate to={ROUTES.ROOT} replace />
  ) : (
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
